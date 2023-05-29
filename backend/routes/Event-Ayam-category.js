const express = require("express");
const EventAyamCategoryModal = require("../model/Event-Ayam-category");
const app = express.Router();

app.post("/add", async (req, res) => {
  const {
    title,
    image,
    description,
    startingDate,
    closingDate,
    status,
    CoordinatorName,
    CoordinatorNumber,
    Registration_Link,
  } = req.body;
  try {
    if (!title || !image) {
      res.status(422).json({ error: "Please fill all the field!!" });
    } else {
      const AyamEventCategory = new EventAyamCategoryModal({
        title,
        image,
        description,
        status,
        startingDate,
        closingDate,
        CoordinatorName,
        CoordinatorNumber,
        Registration_Link,
      });
      AyamEventCategory.save()
        .then((AyamEventCategory) => {
          res.json({
            status: "ok",
            message: "Avesh Event Category Added Successfull :)",
            AyamEventCategory: AyamEventCategory,
          });
        })
        .catch((err) => console.log("Error in backend ", err));
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/all", async (req, res) => {
  try {
    await EventAyamCategoryModal.find().then((eventAyam) => {
      res.json({ status: "ok", eventAyam });
    });
  } catch (err) {
    console.log("Error in getting all Ayam category in backend:", err);
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    await EventAyamCategoryModal.findById(req.params.id)
      .then((singleAyamCategory) => {
        res.json({ status: "ok", singleAyamCategory });
        // console.log(singleAveshCategory.title);
      })
      .catch((err) =>
        console.log(
          "Error in getting single ayam category in backend by Id2 :",
          err
        )
      );
  } catch (error) {
    console.log(
      "Error in getting single ayam category in backend by Id1 :",
      error
    );
  }
});

app.put("/update/:id", async (req, res) => {
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
      Id,
    } = req.body;
    const updateEventAyam = await EventAyamCategoryModal.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          AyamEvents: {
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

    if (!updateEventAyam) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json({
        status: "ok",
        message: "Event Ayam Updated Successfull :)",
        updateEventAyam: updateEventAyam,
      });
    }
  } catch (error) {
    console.log("Error in updating Event Ayam: ", error);
  }
});

module.exports = app;
