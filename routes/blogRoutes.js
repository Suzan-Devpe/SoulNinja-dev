const express = require('express');
const router = express.Router();
const {
  blog_index,
  blog_post,
  blog_create,
  blog_details,
  blog_delete,
} = require("../controllers/blogController");

router.route("/").get(blog_index).post(blog_post);
router.route("/create").get(blog_create);
router.route("/:id").get(blog_details).delete(blog_delete);

module.exports = router;