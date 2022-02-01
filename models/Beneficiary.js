const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  birth_date: {
    type: Date,
    // required: true  
  },
  birth_country: {
    type: String,
    // required: true
  },
  entailment_date: {
    type: Date,
    default: Date.now
    // required: true
  }
})

// exporting the schema as a mongoose model
module.exports = mongoose.model('Beneficiary', beneficiarySchema);