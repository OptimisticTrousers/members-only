const express = require("express");
const router = express.Router();
const passport = require("passport");

const index_controller = require("../controllers/indexController");

/* GET home page. */
router.get("/", index_controller.index);

/* GET sign up page. */
router.get("/sign-up", index_controller.signup_get);

/* POST sign up page. */
router.post("/sign-up", index_controller.signup_post);

/* GET log in page. */
router.get("/log-in", index_controller.login_get);

/* POST log in page. */
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    successFlash: true,
    failureFlash: true,
  })
);
/* GET log out page. */
router.get("/log-out", index_controller.logout_get);

/* GET membership page. */
router.get("/membership", index_controller.membership_get);

/* POST membership page. */
router.post("/membership", index_controller.membership_post);

/* GET admin page. */
router.get("/admin", index_controller.admin_get);

/* POST admin page. */
router.post("/admin", index_controller.admin_post);

module.exports = router;
