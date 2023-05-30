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
EventCategoryRouter.get("/get/:id", (req, res) => {
  EventCategoryModel.findById(req.params.id)
    .then((eventCategory) => {
      res.json({ status: "ok", eventCategory: eventCategory });
    })
    .catch((err) => console.log(err));
});
EventCategoryRouter.put("/update/:id", async (req, res) => {
  try {
    const {
      title,
      image,
      description,
      startingDate,
      closingDate,
      status,
      CoordinatorName,
      CoordinatorNumber,
      place,
    } = req.body;
    const updateOtherEvent = await EventCategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          OtherEvent: {
            title,
            image,
            description,
            status,
            startingDate,
            closingDate,
            CoordinatorName,
            CoordinatorNumber,
            place,
          },
        },
      }
    );

    if (!updateOtherEvent) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json({
        status: "ok",
        message: "Other Event Updated Successfull :)",
        updateOtherEvent: updateOtherEvent,
      });
    }
  } catch (error) {
    console.log("Error in updating Event Avesh: ", error);
  }
});

EventCategoryRouter.delete("/delete/:id", async (req, res) => {
  try {
    const response = await EventCategoryModel.findByIdAndRemove(req.params.id);
    if (response) {
      res.json({
        status: "ok",
        message: "Event Category Deleted Successfull :)",
        response: response,
      });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.log("Error in deleting route", error);
  }
});
module.exports = EventCategoryRouter;
