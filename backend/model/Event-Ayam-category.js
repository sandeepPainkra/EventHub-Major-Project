const mongoose = require("mongoose");

const EventAyamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startingDate: {
    type: String,
  },
  closingDate: {
    type: String,
  },
  status: {
    type: String,
  },
  CoordinatorName: {
    type: String,
  },
  CoordinatorNumber: {
    type: String,
  },
  Registration_Link: {
    type: String,
  },
});

const EventAyamCategoryModal = mongoose.model(
  "EventAyamCategory",
  EventAyamSchema
);

module.exports = EventAyamCategoryModal;
