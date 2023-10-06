const mongoose = require("mongoose");

const newUser = mongoose.Schema({
  userName: String,
  userId: Number,
});

const addUser = mongoose.model("newUser", newUser);
module.exports = addUser;
