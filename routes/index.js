var express = require('express');
var router = express.Router();

var controller = require("../controllers/controller")

/* GET home page. */
router.get('/', controller.index);

router.get("/sign-up", controller.signup_get)

router.get("/log-in", controller.login_get)

router.get("/create", controller.message_create_get)

router.get("/:id", controller.message_detail)

router.get("/:id/delete", controller.message_delete_get)

router.get("/:id/update", controller.message_update_get)

module.exports = router;
