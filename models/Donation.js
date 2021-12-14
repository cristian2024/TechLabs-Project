const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  establishment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Establishment'
  },
  beneficiary_id: {
    type: mongoose.Schema.Types.ObjectId,
    // required: ''
    ref: 'Beneficiary'
  },
  donation_type: {
    type: String,
    // required: true
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
  description: {
    type: String,
    // required: true
  },
  delivery_date: {
    type: Date,
    // default: Date.now()
  }
})

module.exports = mongoose.model('Donation', donationSchema);