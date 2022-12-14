const Post = require("../models/post");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const { body, validationResult } = require("express-validator");

dayjs.extend(relativeTime);

exports.post_list = function (req, res, next) {
  Post.find()
    .populate("user")
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }

      const updatedPosts = list_posts.map((post) => ({
        ...post.toObject(),
        timestamp: dayjs(post.timestamp).fromNow(),
      }));

      // const updatedPosts = list_posts.map((post) => ({...post, timestamp: dayjs(post.timestamp).fromNow()}))

      // toObject: https://stackoverflow.com/questions/48014504/es6-spread-operator-mongoose-result-copy

      res.render("post_list", {
        title: "Posts List",
        post_list: updatedPosts,
        membershipStatus: req.user?.membershipStatus,
        admin: req.user?.admin,
      });
    });
};

exports.post_create_get = function (req, res, next) {
  res.render("post_form", {
    title: "Create Post",
  });
};

// Handle post create on POST.
exports.post_create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Create a Post object with escaped and trimmed data.
    const post = new Post({
      title: req.body.title,
      user: req.user,
      timestamp: dayjs(),
      content: req.body.content,
    });

    if (!req.user) {
      res.render("post_form", {
        title: "Create Post",
        errors: [{ msg: "You are not signed in! Please log in!" }],
      });
    } else if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("post_form", {
        title: "Create Post",
        post,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save post.
      post.save(function (err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new author record
        res.redirect("/posts");
      });
    }
  },
];

exports.post_delete_get = function (req, res, next) {
  Post.findById(req.params.id)
    .populate("user")
    .exec(function (err, post) {
      if (err) {
        return next(err);
      }
      if (post == null) {
        // No results.
        res.redirect("/posts");
      }
      // Successful, so render.
      res.render("post_delete", {
        title: "Delete Post",
        post,
      });
    });
};

// Handle Post delete on POST.
exports.post_delete_post = function (req, res, next) {
  // Assume valid Post id in field.

  if (!req.user.admin) {
    const error = new Error(
      "You are not an admin! If you are an admin, please log in!"
    );
    error.status = 401;
    return next(error);
  }

  Post.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      return next(err);
    }
    // Success, so redirect to list of Post items
    res.redirect("/posts");
  });
};
