// getRegister, postRegister, getLogin, postLogin, logOut

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const path = require("path");

const getRegister = async (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../public/register.html"));
};

const postRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || typeof name != "string") {
    return res.json({
      status: "error",
      error: "Name doesnt pass all criterias",
    });
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
  res.sendFile(path.join(__dirname, "/../public/login.html"));
};

const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email: email,
  }).lean();

  console.log(user);

  if (!user) {
    return res.json({
      status: "error",
      error: "Username / password incorrect",
    });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET
    );

    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Username / password incorrect" });
};

// todo: logout functionality
const logOut = async (req, res, next) => {
  res.json({ success: true });
};

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logOut,
};
