const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// blogs/index page
router.get("/", blogController.blog_index);

// post to blogs
router.post("/", blogController.blog_post);

// create blog route
router.get("/create", blogController.blog_create);

// view blog
router.get("/:id", blogController.blog_details);

// delete blog
router.delete("/:id", blogController.blog_delete);

module.exports = router;