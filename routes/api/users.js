const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.post("/register", (req, res) => {
  const errors = {};
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(400).json((errors.email = "Email already exists."));
    }
  });
});

module.exports = router;
