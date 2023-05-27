const express = require("express");
const EventAveshCategoryModal = require("../model/Event-Avesh-category");
const EventAveshRouter = express.Router();

EventAveshRouter.post("/add", (req, res) => {
  const { title, image, description } = req.body;
  try {
    if (!title || !image) {
      res.status(422).json({ error: "Please fill all the field!!" });
    } else {
      const AveshEventCategory = new EventAveshCategoryModal({
        title,
        image,
        description,
      });
      AveshEventCategory.save()
        .then((AveshEventCategory) => {
          res.json({
            status: "ok",
            message: "Avesh Event Category Added Successfull :)",
            AveshEventCategory: AveshEventCategory,
          });
        })
        .catch((err) => console.log("Error in backend ", err));
    }
  } catch (error) {
    console.log(error);
  }
});
EventAveshRouter.get("/all", async (req, res) => {
  try {
    await EventAveshCategoryModal.find().then((eventAvesh) => {
      res.json({ status: "ok", eventAvesh });
    });
  } catch (err) {
    console.log("Error in getting all avesh category in backend:", err);
  }
});
EventAveshRouter.get("/get/:id", async (req, res) => {
  try {
    await EventAveshCategoryModal.findById(req.params.id)
      .then((singleAveshCategory) => {
        res.json({ status: "ok", singleAveshCategory });
      })
      .catch((err) =>
        console.log(
          "Error in getting single avesh category in backend by Id2 :",
          err
        )
      );
  } catch (error) {
    console.log(
      "Error in getting single avesh category in backend by Id1 :",
      error
    );
  }
});

EventAveshRouter.put("/update/:id", async (req, res) => {
  try {
    const { title, image, description } = req.body;
    const updateEventAvesh = await EventAveshCategoryModal.findByIdAndUpdate(
      req.params.id,
      {
        AveshEvent: { title, image, description },
      },
      {
        timestamps: true,
      },
      {
        new: true,
      }
    );
    if (!updateEventAvesh) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json({
        status: "ok",
        message: "Event Avesh Updated Successfull :)",
        updateEventAvesh: updateEventAvesh,
      });
    }
  } catch (error) {
    console.log("Error in updating Event Avesh: ", error);
  }
});
module.exports = EventAveshRouter;
