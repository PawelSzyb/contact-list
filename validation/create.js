const isEmpty = require("./is-empty");
const Validator = require("validator");

module.exports = function validateCreateInputs(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.number = !isEmpty(data.number) ? data.number : "";

  // **** Name ****
  if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
    errors.name = "Name must between 4 and 30 characters.";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // **** Email ****
  if (!Validator.isEmail(data.email)) {
    errors.email = "Not a valid email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // **** Number ****
  if (!Validator.isLength(data.number, { min: 9, max: 9 })) {
    errors.number = "Number field must be 9 charachters";
  }
  if (Validator.isEmpty(data.number)) {
    errors.number = "Number field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
