const mongoose = require("mongoose");

const establishmentSchema = new mongoose.Schema({
  establishment_name: {
    type: String,
    required: true
  },
  establishment_type: {
    type: String,
    // required: true
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true
    ref: 'City'
  },
  district: {
    type: String,
    // required: true
  },
  schedule: {
    type: Date,
    // required: true
  },
  qualification: {
    type: Number,
    // required: true
  },
  
})

module.exports = mongoose.model('Establishment', establishmentSchema);