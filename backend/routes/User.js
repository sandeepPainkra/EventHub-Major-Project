const express = require("express");
const User = require("../model/User");
const Bycript = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.get("/", (req, res) => {
  res.send("hello world");
});
router.post("/signup", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  const isUserExist = await User.findOne({ email: email });
  try {
    if (isUserExist) {
      // do something
      return res
        .status(422)
        .json({ status: "error", message: "User Already exist!!" });
    } else if (!name || !email || !password) {
      return res
        .status(422)
        .json({ status: "error", message: "Please fill all the field!!" });
    } else {
      Bycript.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          name,
          email,
          password: hashedPassword,
          cpassword,
        });
        user
          .save()
          .then((user) => {
            res.json({
              status: "ok",
              message: "Account Registered Successfull :)",
              user: user,
            });
          })
          .catch((err) => console.log(err));
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(422)
        .json({ status: "error", message: "Please fill all the field!!" });
    } else {
      User.findOne({ email: email })
        .then((user) => {
          if (user) {
            Bycript.compare(password, user.password)
              .then((isMatch) => {
                if (isMatch) {
                  const token = jwt.sign(
                    { _id: user._id },
                    "jdhjdbndbhgduey,lklj"
                  );
                  const { _id, name, email } = user;
                  res.json({
                    status: "ok",
                    message: "Login Successfull :)",
                    token: token,
                    user: { _id, name, email },
                  });
                } else {
                  res.status(422).json({
                    status: "error",
                    message: "Invalid Credentials!!",
                  });
                }
              })
              .catch((err) => console.log(err));
          } else {
            res
              .status(422)
              .json({ status: "error", message: "Invalid Credentials!!" });
          }
        })
        .catch((err) => console.log(err));
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
