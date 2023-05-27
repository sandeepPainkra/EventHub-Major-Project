const express = require("express");
const EventAveshCategoryModal = require("../model/Event-Avesh-category");
const EventAveshRouter = express.Router();

// EventAveshRouter.post("/add", async (req, res) => {
//   const { title, image, description } = req.body;

//   try {
//     if (!title || !image) {
//       return res.status(422).json({ error: "Plase add all the fields" });
//     } else {
//       const eventAvesh = new EventAveshCategoryModal(
//         {
//           title,
//           image,
//           description,
//         },
//         {
//           timestamps: true,
//         }
//       );
//       // await eventAvesh.save();
//       eventAvesh
//         .save()
//         .then((eventAvesh) => {
//           res.json({
//             status: "ok",
//             message: "Event Avesh Added Successfull :)",
//             eventAvesh: eventAvesh,
//           });
//         })
//         .catch((err) => {
//           console.log("Error in adding Event Avesh in backend is: ", err);
//         });
//     }

//     // res.status(201).json({ message: "Event Avesh added successfully" });
//   } catch (err) {
//     console.log(err);
//   }
// });

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
module.exports = EventAveshRouter;
