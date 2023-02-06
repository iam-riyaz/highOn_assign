const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const { connect } = require("mongoose");

dotenv.config();

const app = express();
app.use(express.json());



app.get("/",(req,res)=>{
    res.status(200).send("get request is successful")
})

const port= process.env.PORT || 3000
connectDb().then(() => {
  app.listen(port, () => {
    console.log("listening on port 2000");
  });
});

