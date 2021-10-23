const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  id_type: {
    type: Number,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  addresss: {
    type: String,
    required: true
  },
  birth_date: {
    type: Date,
    required: true
  },
  birth_country: {
    type: String,
    required: true
  },
  entailment_date: {
    type: Date,
    required: true
  }
})