const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  establishment_id: {
    type: Number,
    required: true
  },
  donation_id: {
    type: Number,
    required: true
  },
  beneficiary_id: {
    type: Number,
    required: true
  },
  donation_type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  elaboration_date: {
    type: Date,
    required: true
  },
  delivery_date: {
    type: Date,
    required: true
  }
})