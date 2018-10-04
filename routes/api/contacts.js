const express = require("express");
const router = express.Router();
const passport = require("passport");

const Contact = require("../../models/Contact");

// Validation
const validateCreateInputs = require("../../validation/create");

// @route   GET api/contacts
// @desc    test route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Contact.find()
      .then(contacts => res.json(contacts))
      .catch(err =>
        res.status(400).json({ nocontactsfound: "No contacts found" })
      );
  }
);

// @route   POST api/contacts/create
// @desc    creating new contact
router.post("/create", (req, res) => {
  const { errors, isValid } = validateCreateInputs(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Contact.findOne({ email: req.body.email }).then(contact => {
    if (contact) {
      errors.email = "Contact already exists";
      return res.status(400).json(errors);
    } else {
      const newContact = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        user_id: req.body.user_id
      };
      console.log(newContact);
      new Contact(newContact)
        .save()
        .then(contact => res.json(contact))
        .catch(err => console.log(err));
    }
  });
});

// @route   POST api/contacts/edit/:id
// @desc    edit contact
router.post("/edit/:id", (req, res) => {
  const { errors, isValid } = validateCreateInputs(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const contactFields = {};
  if (req.body.name) contactFields.name = req.body.name;
  if (req.body.email) contactFields.email = req.body.email;
  if (req.body.number) contactFields.number = req.body.number;

  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        Contact.findOneAndUpdate(
          { _id: req.params.id },
          { $set: contactFields },
          { new: true }
        )
          .then(contact => res.json(contact))
          .catch(err => res.json(err));
      } else {
        errors.name = "Contact not found";
        return res.status(404).json(errors);
      }
    })
    .catch(err =>
      res.status(404).json({ contactnotfound: "Contact not found." })
    );
});

// @route   DELETE api/contacts/:id
// @desc    remove contact
router.delete("/:id", (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => res.json({ contactnotfound: "contact not found" }));
});

module.exports = router;
