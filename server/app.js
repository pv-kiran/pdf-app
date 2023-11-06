const express = require("express");
const { connectDB } = require("./db/connection");
require("dotenv").config();

const app = express();

const start = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log(`App is listening at port 3000`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
