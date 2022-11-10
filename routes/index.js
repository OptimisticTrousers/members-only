var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/sign-up", function (req, res, next) {
  res.render("signup_form")
})

router.get("/log-in", function (req, res, next) {
  res.render("login_form")
})

router.get("/create", function(req, res, next) {
  res.render("message_form")
})

router.get("/:id", function(req, res, next) {
  res.render("message_detail")
})

router.get("/:id/delete", function(req, res, next) {
  res.render("message_delete")
})

router.get("/:id/update", function (req, res, next) {
  res.render("message_form")
})

module.exports = router;
