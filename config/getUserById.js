const User = require("../models/user");

module.exports = (id) => {
  User.findById(id);
};
