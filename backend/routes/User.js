const express = require("express");
const router = express.Router();

router.post("api/user/signup", (req, res) => {
  const { name, email, password, cpassword } = res.body;
  try {
    console.log(name, email);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
