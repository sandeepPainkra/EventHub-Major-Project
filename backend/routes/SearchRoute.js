const express = require("express");
const EventAveshCategoryModal = require("../model/Event-Avesh-category");

const app = express.Router();

app.get("/events/:key", (req, res) => {
  const key = req.params.key;
  try {
    EventAveshCategoryModal.find({
      $or: [
        { title: { $regex: key } },
        { description: { $regex: key } },
        {
          "AveshEvent.title": { $regex: key },
        },
      ],
    })
      .then((data) => {
        res.json({ status: "ok", events: data });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log("Error in SearchRoute.js1", error);
  }
});

module.exports = app;
