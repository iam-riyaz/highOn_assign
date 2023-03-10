const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const { connect } = require("mongoose");
const User = require("./models/userSchema");
const cors = require("cors");
const Owner = require("./models/ownerSchema");
const QRCode = require("qrcode");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("get request is successful");
});

// signup method , user will register from this method
app.post("/signup", async (req, res) => {
  const data = req.body;
  const length = Object.keys(data).length;
  if (length == 4) {
    try {
      const user = await new User({ ...data });
      user.save();
      res.send(user);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).send("please fill all fields");
  }
});

// user loign method , user will loing from this method
app.post("/login_user", async (req, res) => {
  const data = req.body;
  const length = Object.keys(data).length;
  if (length == 2) {
    try {
      const { userid: userid, password } = data;
      const user = await User.findOne({ userid: userid, password: password });
      if (!user) {
        res.status(404).send("invalid username or password");
      }
      res.status(200).send(user._id);
    } catch (err) {}
  } else {
    res.status(400).send("please fill all fields");
  }
});

//Owner login method, owner will from here
app.post("/login_owner", async (req, res) => {
  const data = req.body;
  const length = Object.keys(data).length;
  if (length == 2) {
    try {
      const { userid, password } = data;
      const owner = await Owner.findOne({ userid: userid, password: password });
      if (!owner) {
        res.status(404).send("invalid userid or password");
      }
      res.status(200).send("your login was successful");
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).send("please fill all fields");
  }
});

// create QR code
app.post("/create_qr", async (req, res) => {
  let data = req.body.id;

  QRCode.toDataURL(data)
    .then((url) => {
      res.send(url);

      console.log(url);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

// update user data, add qr data and unique code
app.patch("/update_user", async (req, res) => {
  const { latitude, longitude, qrcode, code, id } = req.body;

  const data = await User.findOneAndUpdate(
    { _id: id },
    { latitude: latitude, longitude: longitude, qrcode: qrcode, code: code }
  );

  if (!data) {
    res.send("request is failed");
  }
  res.send("updated successfully");
});

app.get("/ownerdata", async (req, res) => {
  try {
    const data = await Owner.findOne({ userid: "testuser" });
    console.log(data);
    res.send(data);
  } catch (err) {}
});

const port = process.env.PORT || 3000;
connectDb().then(() => {
  app.listen(port, () => {
    console.log("listening on port 2000");
  });
});
