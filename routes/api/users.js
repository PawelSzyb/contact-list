const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys_dev");
const passport = require("passport");

const User = require("../../models/User");

// @route   POST api/users/register
// @desc    register new user
router.post("/register", (req, res) => {
  const errors = {};
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json((errors.email = "Email already exists."));
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
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    login user / return token -jwt
router.post("/login", (req, res) => {
  const errors = {};
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json((errors.email = "User not found."));
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
          return res.status(400).json((errors.password = "Password incorrect"));
        }
      });
    }
  });
});

// @route   POST api/users/current
// @desc    return curr user
router.get("/current", passport.authenticate("jwt", { session: false }));

module.exports = router;
