const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173" }));

const { connectDB } = require("./db/connection");

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

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
