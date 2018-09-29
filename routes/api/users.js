const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys_dev");
const passport = require("passport");

const User = require("../../models/User");

// Validation
const validateRegisterInput = require("../../validation/auth/register");
const validateLoginInput = require("../../validation/auth/login");

// @route   POST api/users/register
// @desc    register new user
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists.";
      res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user =>
              res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                date: user.date
              })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    login user / return token -jwt
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found.";
      return res.status(400).json(errors);
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // JWT PAYLOAD
          const payload = {
            id: user._id,
            name: user.name
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: "1h"
            },
            (err, token) => {
              res.json({ token: `Bearer ${token}` });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

// @route   POST api/users/current
// @desc    return curr user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
