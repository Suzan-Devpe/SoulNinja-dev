// imports
const express = require("express");
const app = express();
const morgan = require("morgan");

// mongoose db
const mongoose = require("mongoose");

// routes
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

// dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

// uri of the database
const dbURI = process.env.DBURI.toString();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT);
    console.log(`listening on http://localhost:${PORT} \nConnected to DB`);
  })
  .catch((err) => console.log(err));

// cors
const cors = require("cors");
app.use(cors());

// setting the view engine as ejs
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.json());
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

// blogs controller
app.use("/blogs", blogRoutes);

// auth controller
app.use("/auth", authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Not found" });
});
