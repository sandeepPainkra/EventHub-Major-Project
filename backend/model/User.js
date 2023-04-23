const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  head_coordinator: {
    type: Boolean,
    default: false,
  },
  coordinator: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.model("User", userSchema);

module.exports = model;
