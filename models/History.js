
const mongoose = require("mongoose");


const historySchema = new mongoose.Schema({
  stock_id: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  },
  information: {
    type: String,
    default: 'No se agrego informacion al respecto'
  },
  creation_date: {
    type: Date,
    default: Date.now()
  }
})


module.exports = mongoose.model('History', historySchema)