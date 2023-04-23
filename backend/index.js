const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/User");

// connection to database

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("connection successfull");
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use("api/user", router);

app.listen(process.env.PORT, () => {
  console.log("Server is listening in port 5000");
});
