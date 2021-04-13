const { Router } = require("express");
const {
  getSignUp,
  postSignUp,
  getLogin,
  postLogin,
  logOut,
} = require("../controllers/authController");

const router = new Router();

router.route("/signup").get(getSignUp).post(postSignUp);
router.route("/login").get(getLogin).post(postLogin);
router.route("/logout").delete(logOut);

module.exports = router;
