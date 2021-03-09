const User = require("../models/user");

module.exports = (email) => {
  User.findOne({ email: email });
};
