const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Country', countrySchema)