const express = require('express');
const router = express.Router();
const {
  blog_index,
  blog_post,
  blog_create,
  blog_details,
  blog_delete,
} = require("../controllers/blogController");
const { protectRoute } = require("../middlewares/auth");

router.route("/").get(blog_index).post(protectRoute, blog_post);
router.route("/create").get(protectRoute, blog_create);
router.route("/:id").get(blog_details).delete(blog_delete);

module.exports = router;