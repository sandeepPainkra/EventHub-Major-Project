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
  cpassword: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "demo image",
  },
  bio: {
    type: String,
  },
  phone: {
    type: String,
    default: 123456789,
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
  tokens: [
    {
      type: Object,
    },
  ],
});

const model = mongoose.model("User", userSchema);

module.exports = model;
