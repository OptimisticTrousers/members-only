exports.index = function (req, res, next) {
  res.render("index", { title: "Clubhouse" });
};

exports.signup_get = function (req, res, next) {
  res.render("signup_form");
};

exports.login_get = function (req, res, next) {
  res.render("login_form");
};
