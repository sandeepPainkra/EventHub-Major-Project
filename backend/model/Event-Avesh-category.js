const mongoose = require("mongoose");

const EventAvesh = new mongoose.Schema({
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
  AveshEvent: [
    {
      type: Object,
    },
  ],
});

const EventAveshCategoryModal = mongoose.model(
  "EventAveshCategory",
  EventAvesh
);

module.exports = EventAveshCategoryModal;
