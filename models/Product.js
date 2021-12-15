const mongoose = require("mongoose");
const types = require("../utils/Types")

const productSchema = new mongoose.Schema({
  establishment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  product_name:{
    type: String,
    required: [true, 'Es necesario proporcionar el nombre del producto']
  },
  product_type: {
    type: [String],
    enum: types
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
  },
  
})

module.exports = mongoose.model('Product', productSchema)