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
// passport
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./config/passport");
const getUserByEmail = require("./config/getUserByEmail");
const getUserById = require("./config/getUserById");
initializePassport(
  passport,
  (email) => getUserByEmail,
  (id) => getUserById
);

// auth
const { checkAuthenticated } = require("./config/auth");

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

// setting the view engine as ejs
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// routes
// root
app.get("/", checkAuthenticated, (req, res) => {
  res.redirect("/blogs");
});

// about route
app.get("/about", checkAuthenticated, (req, res) => {
  res.render("about", { title: "About" });
});

// blogs controller
app.use("/blogs", checkAuthenticated, blogRoutes);

// auth controller
app.use("/auth", authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "Not found" });
});
