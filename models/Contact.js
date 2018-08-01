const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contact = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
