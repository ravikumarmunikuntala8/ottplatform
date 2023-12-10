const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Platform: String,
  Username: String,
  Password: String,
},{ timestamps: true });

const User = new mongoose.model("user", userSchema);

module.exports = User;
