const mongoose = require("mongoose");

const newStudent = mongoose.Schema({
  input: String,
});

const addStudent = mongoose.model("addStudent", newStudent);

module.exports = addStudent;
