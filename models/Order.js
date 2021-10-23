const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true
  },
  client_id: {
    type: Number,
    required: true
  },
  delivery_date: {
    type: Date,
    required: true
  }
})