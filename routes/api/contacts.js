const express = require("express");
const router = express.Router();

// @route   GET api/contacts/test
// @desc    test route
router.get("/test", (req, res) => res.json({ msg: "contact works" }));

module.exports = router;
