const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");

/* GET request for list of all posts. */
router.get("/", post_controller.post_list);

/* GET request for creating posts. */
router.get("/create", post_controller.post_create_get);

router.post("/create", post_controller.post_create_post);

/* GET request to delete post. */
router.get("/:id/delete", post_controller.post_delete_get);

/* POST request to delete post. */
router.post("/:id/delete", post_controller.post_delete_post);

module.exports = router;
