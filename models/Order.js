const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'Client'
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 0
      }
    }
  ],
  delivery_date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Order', orderSchema)
