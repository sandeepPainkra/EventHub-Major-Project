const express = require("express");
const User = require("../model/User");
const Bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const LoginRequired = require("../middleware/LoginRequired");

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
              .then(async (isMatch) => {
                if (isMatch) {
                  const token = jwt.sign(
                    { _id: user._id },
                    "jdhjdbndbhgduey,lklj",
                    {
                      expiresIn: "1h",
                    }
                  );
                  let OldTokens = user.tokens || [];
                  if (OldTokens.length) {
                    OldTokens = OldTokens.filter((t) => {
                      const timeDeff =
                        (Date.now() - parseInt(t.signedAt)) / 1000;
                      if (timeDeff < 3600) {
                        return t;
                      }
                    });
                  }
                  try {
                    await User.findByIdAndUpdate(user._id, {
                      tokens: [
                        ...OldTokens,
                        { token, signedAt: Date.now().toString() },
                      ],
                    });
                  } catch (error) {
                    console.log("Token update error: ", error);
                  }

                  const { _id, name, email } = user;
                  res.json({
                    status: "ok",
                    message: "Login Successfull :)",
                    user: {
                      _id,
                      name,
                      email,
                      token: user.tokens[user.tokens.length - 1].token,
                    },
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

router.post("/logout", LoginRequired, async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) {
      console.log("backend token: ", token);
      return res.status(401).json({ error: "You must be logged in !!" });
    } else {
      const tokens = req.user.tokens;
      // console.log("Token from header : ", token);
      // console.log("first tokens: ", tokens);
      const newTokens = tokens.filter((t) => t.token !== token);
      // console.log("new tokens: ", newTokens);
      try {
        await User.findByIdAndUpdate(req.user._id, {
          $set: { tokens: newTokens },
        });
        return res.json({ status: "ok", message: "Logout Successfull :)" });
      } catch (error) {
        console.log("Error in logout: ", error);
      }
    }
  } catch (error) {
    console.log("error in logout: ", error);
  }
});

router.put("/update-profile", LoginRequired, async (req, res) => {
  const { name, bio, image } = req.body;
  try {
    if (!name || !bio) {
      res
        .status(422)
        .json({ status: "error", message: "Please fill all the field!!" });
    } else {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { name, bio, image },
        { new: true }
      );
      res.json({
        status: "ok",
        message: "Profile Updated Successfull :)",
        user: user,
      });
    }
  } catch (error) {
    console.log("Error in update profile: ", error);
  }
});

module.exports = router;
