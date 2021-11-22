const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", User);
