const Stock = require('../models/Stock')

module.exports = {
  /**
   * Calculate the stock_id from its params
   * @param {*} product_id 
   * @param {*} stablishment_id 
   */
  GetStockId: async (product_id, establishment_id, callback ) => {
    try {
      Stock.findOne({ product_id, establishment_id }, (error, result) => {
        if(error)
          callback(error)
        else{
          callback(error, result._id)
        }
      }).clone()
    } catch (error) {
      callback(error)
    }
  },
  HasStock: async (stock_id, amount, callback) => {
    try {
      Stock.findById(stock_id, (error, result) => {
        if(error)
          callback(error)
        else{
          if((result.stock+amount)>=0){
            callback(error, true)
          }
          callback(error, false)
        }
      }).clone() 
    } catch (error) {
      callback(error)
    }
  },
  GetStock: async (stock_id, callback) => {
    if(!stock_id){
      callback("The 'stock_id' item is necessary")
    }else{
      try {
        Stock.findById(stock_id, (error, result)=>{
          if(error)
            callback(error)
          else
            callback(error, result)
        }).clone()
      } catch (error) {
        callback(error)
      }
      
    }
  }

}