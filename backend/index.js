const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/User");
const EventCategoryRouter = require("./routes/Event-Category");

// connection to database

mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => {
    console.log("connection successfull");
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use("/api/user", router);
app.use("/api/post/v1/eventcategory", EventCategoryRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is listening in port 5000");
});
