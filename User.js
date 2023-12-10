const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Platform: String,
  ID: String,
  Pass: String,
},{ timestamps: true });

const User = new mongoose.model("user", userSchema);

module.exports = User;
