const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateLoginInput(data) {
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  let errors = {};

  // EMAIL
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is not valid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  // PASSWORD
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
