var express = require("express");
var router = express.Router();

var index_controller = require("../controllers/indexController");

/* GET home page. */
router.get("/", index_controller.index);

/* GET sign up page. */
router.get("/sign-up", index_controller.signup_get);

router.post("/sign-up", index_controller.signup_post)

/* GET log in page. */
router.get("/log-in", index_controller.login_get);

/* GET membership page. */
router.get("/membership", index_controller.membership_get);

/* GET admin page. */
router.get("/admin", index_controller.admin_get);

module.exports = router;
