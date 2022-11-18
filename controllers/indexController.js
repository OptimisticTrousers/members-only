const User = require("../models/user");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.index = function (req, res, next) {
  res.render("index", { title: "Clubhouse" });
};

exports.signup_get = function (req, res, next) {
  res.render("signup_form", {
    title: "Sign Up",
  });
};

// Handle sign up on POST
exports.signup_post = [
  // Validate and sanitize fields.
  body("firstName").trim().isLength({ min: 1 }).escape(),
  body("lastName").trim().isLength({ min: 1 }).escape(),
  body("email")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(async (value) => {
      try {
        const user = await User.findOne({ username: value });
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      } catch (err) {
        return Promise.reject("Server Error");
      }
    }),
  body("password").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract validation errors from a request.
    const errors = validationResult(req);

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        membershipStatus: false,
        admin: false,
      });

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
        res.render("signup_form", {
          title: "Sign Up",
          user,
          errors: errors.array(),
        });
      } else {
        user.save(function (err) {
          if (err) {
            return next(err);
          }
          // Successful - redirect to home page
          res.redirect("/");
        });
      }
    });
  },
];

exports.login_get = function (req, res, next) {
  const errors = req.session.flash?.error.map((msg) => ({ msg }));
  res.render("login_form", {
    title: "Log In",
    errors,
  });
};

exports.logout_get = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.membership_get = function (req, res, next) {
  res.render("membership_form", {
    title: "Membership Code",
  });
};

exports.membership_post = [
  // Process request after validation and sanitization.
  body("code").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    // Extract validation errors from a request
    const errors = validationResult(req);
    if (!req.user) {
      res.render("membership_form", {
        title: "Membership Code",
        errors: [
          {
            msg: "You are not signed in! Please log in before entering your membership code!",
          },
        ],
      });
    } else if (req.user.membershipStatus) {
      res.render("membership_form", {
        title: "Membership Code",
        errors: [{ msg: "You are already a member!" }],
      });
    } else if (req.body.code !== process.env.MEMBERSHIP_CODE) {
      res.render("membership_form", {
        title: "Membership Code",
        errors: [{ msg: "Wrong code. Please try again." }],
      });
    } else if (!errors.isEmpty()) {
      res.render("membership_form", {
        title: "Membership Code",
        errors: errors.array(),
      });
    } else {
      // Data from form is valid.
      User.findByIdAndUpdate(req.user, { membershipStatus: true }, (err) => {
        if (err) {
          return next(err);
        }
        // Success
        res.redirect("/posts");
      });
    }
  },
];

exports.admin_get = function (req, res, next) {
  res.render("admin_form", {
    title: "Admin Code",
  });
};

exports.admin_post = [
  // Process request after validation and sanitization.
  body("code").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    // Extract validation errors from a request
    const errors = validationResult(req);
    if (!req.user) {
      res.render("admin_form", {
        title: "Admin Code",
        errors: [{ msg: "Please log in before entering the code!" }],
      });
    } else if (req.user.admin) {
      res.render("admin_form", {
        title: "Admin Code",
        errors: [{ msg: "You are already an admin!" }],
      });
    } else if (req.body.code !== process.env.ADMIN_CODE) {
      res.render("admin_form", {
        title: "Admin Code",
        errors: [{ msg: "Wrong code. Please try again." }],
      });
    } else if (!errors.isEmpty()) {
      res.render("admin_form", {
        title: "Admin Code",
        errors: errors.array(),
      });
    } else {
      // Data from form is valid.
      User.findByIdAndUpdate(req.user, { admin: true }, (err) => {
        if (err) {
          return next(err);
        }
        // Success
        res.redirect("/posts");
      });
    }
  },
];
