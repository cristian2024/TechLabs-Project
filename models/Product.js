const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  establishment_id: {
    type: Number,
    required: true
  },
  product_type: {
    type: String,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  order_id: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  elaboration_date: {
    type: String,
    required: true
  }
})