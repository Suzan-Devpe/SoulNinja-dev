// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const Blog = require("./models/blog");
// mongoose db
const mongoose = require("mongoose");

// uri of the database
const dbURI =
  "mongodb+srv://soulninja:password17@learnmongo.dkeod.mongodb.net/nodejscrashcourse?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log(`listening on http://localhost:${process.env.PORT || 3000} \nConnected to DB`);
  })
  .catch((err) => console.log(err));

// setting the view engine as ejs
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
// root
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// about route
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blogs/index page
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "All Blogs",
        blogs: result,
      });
    })
    .catch((err) => console.log(err));
});

// post to blogs
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

// create blog route
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id).then((result) => {
      res.json({ redirect: "/blogs" });
  }).catch(err => console.log(err));
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Not found" });
});
