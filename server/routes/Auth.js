const { body, validationResult } = require("express-validator");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// function to return token
function jwtSingUp(user) {
  return jwt.sign(user, process.env.JWT_SECRET || "secret", {
    expiresIn: "2h"
  });
}

router.post("/register", async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const newUser = new User(req.body);

    let result = await newUser.save();
    const userJson = result.toJSON();
    res.send({
      user: userJson,
      token: jwtSingUp(userJson)
    });
  } catch (err) {
    res.status(400).send({
      error: "Username already exist"
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username: username }).exec();
    if (!user) {
      return res.status(403).send({
        error: "The username does not exist"
      });
    }
    user.comparePassword(password, (error, match) => {
      if (!match) {
        return res.status(403).send({
          error: "The password is invalid"
        });
      }
    });
    // if username and password match send back user and jwt-token
    res.send({
      user: user.toJSON(),
      token: jwtSingUp(user.toJSON())
    });
  } catch (error) {
    res.status(400).send({
      error: err.response
    });
  }
});

module.exports = router;
