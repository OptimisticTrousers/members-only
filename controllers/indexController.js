const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.index = function (req, res, next) {
  res.render("index", { title: "Clubhouse" });
};

exports.signup_get = function (req, res, next) {
  res.render("signup_form");
};

// Handle sign up on POST
exports.signup_post = [
  // Validate and sanitize fields.
  body("firstName").trim().isLength({ min: 1 }).escape(),
  body("lastName").trim().isLength({ min: 1 }).escape(),
  body("email").isEmail().normalizeEmail(),
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
        return;
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
  res.render("login_form");
};

exports.membership_get = function (req, res, next) {
  res.render("vip_form");
};

exports.admin_get = function (req, res, next) {
  res.render("vip_form");
};
