// blog index, ,blog create get ,blog create post, blog delete
// blog delete

// protected routes: blog_post, blog_create, blog_post, blog_delete(has to be same user too)

const Blog = require("../models/blog");

const blog_index = (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("index", {
				title: "All Blogs",
				blogs: result,
			});
		})
		.catch((err) => console.log(err));
};

const blog_post = (req, res) => {
	const body = req.body;
	const blog = new Blog({
		title: body.title,
		snippet: body.snippet,
		body: body.body,
		author: body.author,
	});

	blog
		.save()
		.then((result) => {
			res.redirect("/blogs");
		})
		.catch((err) => console.log(err));
};

const blog_create = (req, res) => {
	res.render("create", { title: "Create" });
};

const blog_details = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.populate("author", "name email")
		.then((result) => {
			res.render("details", { title: "Blog Details", blog: result });
		})
		.catch((err) => {
			console.log(err);
		});
};

const blog_delete = (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: "/blogs" });
		})
		.catch((err) => console.log(err));
};

module.exports = {
	blog_index,
	blog_details,
	blog_create,
	blog_post,
	blog_delete
}