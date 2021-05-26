const mongoose = require("mongoose");

// describes the structure of the documents that we are going to store in the collection.
const Schema = mongoose.Schema;

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		snippet: {
			type: String,
			required: true,
		},

		body: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
