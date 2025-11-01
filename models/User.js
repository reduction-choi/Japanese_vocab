// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
}, {collection: "user"});

module.exports = mongoose.model("User", userSchema);
