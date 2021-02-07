// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
// mongoose db
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes'); 

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

app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Not found" });
});
