const mongoose = require("mongoose");

const { CreateHistory } = require('../controllers/history')

const stockSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  establishment_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: 'Establishment'
  },
  stock: {
    type: Number,
    default: 0
  }
})

stockSchema.post('save', (doc, next) => {
  const information = `The product with id ${doc.product_id}, was created succesfully`
  CreateHistory(doc._id, information)
  
})

stockSchema.post('update', (doc) => {
  
  const information = `The product with id ${doc.product_id}, was increased or decreased`
  
  CreateHistory(doc._id, information)
})

module.exports = mongoose.model('Stock', stockSchema)