// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const Blog = require("./models/blog");

// uri of the database
const dbURI =
  "mongodb+srv://soulninja:password17@learnmongo.dkeod.mongodb.net/nodejscrashcourse?retryWrites=true&w=majority";

// mongoose db
const mongoose = require("mongoose");

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(6969);
    console.log("listening on http://localhost:6969 \nConnected to DB");
  })
  .catch((err) => console.log(err));

// setting the view engine as ejs
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "New Blog",
        snippet: "My new blog",
        body: "body of my new blog"
    });
    
    blog.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
    Blog.find().then((result) => {
        res.send(result);
    }).catch((err) => console.log(err));
});

// root
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Bruh bruh bruh",
      snippet: "lorem doesnt work on javascript files! awesome",
    },
    { title: "ur mom", snippet: "I wont finish the third blog hehe" },
    {
      title: "pls dont make this repo public",
      snippet: "this is the third blog and ",
    },
  ];
  res.render("index", { title: "Home", blogs: blogs });
});

// about route
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// create blog route
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Not found" });
});
