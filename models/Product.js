const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  establishment_id: {
    type: Number,
    required: true
  },
  product_type: {
    type: String,
    // required: true
  },
  // order_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
  description: {
    type: String,
    // required: true
  },
  elaboration_date: {
    type: String,
    // required: true
  }
})

module.exports = mongoose.model('Product', productSchema)