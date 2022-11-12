var express = require("express");
var router = express.Router();

var post_controller = require("../controllers/postController");

/* GET request for list of all posts. */
router.get("/", post_controller.post_list);

/* GET request for creating posts. */
router.get("/create", post_controller.post_create_get);

/* GET request for one post. */
router.get("/:id", post_controller.post_detail);

/* GET request to delete post. */
router.get("/:id/delete", post_controller.post_delete_get);

/* GET request to update post. */
router.get("/:id/update", post_controller.post_update_get);

module.exports = router;