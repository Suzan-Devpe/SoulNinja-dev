const { Router } = require("express");
const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logOut,
} = require("../controllers/authController");

const router = new Router();

router.route("/register").get(getRegister).post(postRegister);
router.route("/login").get(getLogin).post(postLogin);
router.route("/logout").get(logOut);

module.exports = router;
