// getSignUp, postSignUp, getLogin, postLogin, logOut

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const getSignUp = async (req, res, next) => {
  res.redirect("/login.html");
};

const postSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || typeof name != "string") {
    return res.json({ status: "error", error: "Name is not a string" });
  }
  if (!password || password.length < 8) {
    return res.json({
      status: "error",
      error: "Password is not secure enough",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return res.json({ status: "ok" });
  } catch (err) {
    if (err.code === 11000) {
      return res.json({ status: "error", error: "Duplicate value found" });
    }
    throw err;
  }
};

const getLogin = async (req, res, next) => {
  res.redirect("/login.html");
};

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email: email,
  }).lean();

  console.log(user);

  if (!user) {
    // TODO: same thing
    /*
    return res.json({
      status: "error",
      error: "Username / password incorrect",
    });
    */
    return res.redirect("/auth/login");
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET
    );

    // TODO
    // return res.json({ status: "ok", data: token });
    return res.redirect("/");
  }

  // TODO
  // res.json({ status: "error", error: "Username / password incorrect" });
  res.redirect("/auth/login");
};

// todo: logout functionality
const logOut = async (req, res, next) => {
  res.json({ success: true });
};

module.exports = {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
  logOut,
};
