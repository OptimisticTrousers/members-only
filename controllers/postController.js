const Post = require("../models/post")
var { body, validationResult } = require("express-validator");

exports.post_list = function (req, res, next) {
  Post.find().populate("user").exec(function (err, list_posts) {
    if(err) {
      return next(err)
    }

    res.render("post_list", {
      title: "Posts List",
      post_list: list_posts
    });
  })

};

exports.post_create_get = function (req, res, next) {
  res.render("post_form");
};

// Handle post create on POST.
exports.post_create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({min: 1})
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({min: 1})
    .escape(),
    (req, res, next) => {
      // Extract the validation errors from a request
      const errors = validationResult(req)

      // Create a Post object with escaped and trimmed data.
      const post = new Post({
        title: req.body.title,
        user: req.user,
        timestamp: Date.now(),
        content: req.body.content
      })

      if(!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("post_form", {
          title: "Create Post",
          post,
          errors: errors.array()
        })
        return;
      } else {
        // Data from form is valid.
        
        // Save post.
        post.save(function (err) {
          if(err) {
            return next(err)
          }
          // Successful - redirect to new author record
          res.redirect(post.url)
        })
      }
    }
];

exports.post_detail = function (req, res, next) {
  Post.findById(req.params.id).populate("user").exec(function(err, post) {
    if(err) {
      return next(err)
    }
    if(post == null) {
      // No results.
      var err = new Error("Post not found")
      err.status = 404;
      return next(err)
    } 
    // Successful, so render.
    res.render("post_detail", {
      title: "Post: ",
      post
    });
  })
};

exports.post_delete_get = function (req, res, next) {
  Post.findById(req.params.id).populate("user").exec(function (err, post) {
    if(err) {
      return next(err)
    }
    if(post == null) {
      // No results.
      
    }
  })
  res.render("post_delete");
};

exports.post_update_get = function (req, res, next) {
  res.render("post_form");
};
