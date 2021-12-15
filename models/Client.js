const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String, 
    required: true
  },
  address: {
    type: String,
    // required: true
  },
  qualification: {
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model('Client', clientSchema)