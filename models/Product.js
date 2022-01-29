const mongoose = require("mongoose");
const types = require("../utils/Types")

const productSchema = new mongoose.Schema({
  establishment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name:{
    type: String,
    required: [true, 'Es necesario proporcionar el nombre del producto']
  },
  quantity:{
    type: String,
    // required: true
  },
  tags: {
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
  src: {
    type: String,
    // required: true
  },
  alt: {
    type: String,
    // required: true
  },
  
})

module.exports = mongoose.model('Product', productSchema)