const mongoose = require("mongoose");

const eventCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/899308580/photo/musicians-on-a-stage.jpg?b=1&s=612x612&w=0&k=20&c=NPlP9qpxh5GYQLomji5HBh9DJH1bhuraSy5l0rLw51w=",
  },
});
const EventCategoryModel = mongoose.model("EventCategory", eventCategorySchema);

module.exports = EventCategoryModel;
