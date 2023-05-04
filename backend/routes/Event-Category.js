const express = require("express");
const EventCategoryModel = require("../model/Event-category");
const EventCategoryRouter = express.Router();

EventCategoryRouter.post("/add", (req, res) => {
  const { title, image } = req.body;
  try {
    if (!title || !image) {
      res.status(422).json({ error: "Please fill all the field!!" });
    } else {
      const eventCategory = new EventCategoryModel({
        title,
        image,
      });
      eventCategory
        .save()
        .then((eventCategory) => {
          res.json({
            status: "ok",
            message: "Event Category Added Successfull :)",
            eventCategory: eventCategory,
          });
        })
        .catch((err) => console.log(err));
    }
  } catch (error) {
    console.log(error);
  }
});
EventCategoryRouter.get("/all", (req, res) => {
  EventCategoryModel.find()
    .then((eventCategory) => {
      res.json({ status: "ok", eventCategory: eventCategory });
    })
    .catch((err) => console.log(err));
});

module.exports = EventCategoryRouter;
