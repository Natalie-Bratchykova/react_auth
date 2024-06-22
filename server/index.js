require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const PORT = process.env.PORT || 8080;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_DOMAIN,
  })
);
app.use(errorMiddleware);
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    app.listen(PORT, () => console.log(`Server works on PORT = ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
