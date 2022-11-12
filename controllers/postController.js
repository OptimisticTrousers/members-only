exports.post_list = function (req, res, next) {
  res.render("post_list");
};

exports.post_create_get = function (req, res, next) {
  res.render("post_form");
};

exports.post_detail = function (req, res, next) {
  res.render("post_detail");
};

exports.post_delete_get = function (req, res, next) {
  res.render("post_delete");
};

exports.post_update_get = function (req, res, next) {
  res.render("post_form");
};
