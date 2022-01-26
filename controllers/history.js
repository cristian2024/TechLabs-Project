const History = require('../models/History')


module.exports = {
  CreateHistory: async (stock_id, information, callback) => {
    if(!stock_id){
      callback('It wasnt provided the stock id, please repair')
    }else {
      const history = new History({
        stok_id,
        information
      })
      try {
        history.save((error)=>{
          if(error)
            callback(error)
          else
            callback(error, history)
        }).clone()
      } catch (error) {
        callback(error)
      }
    }
  },
  GetHistory: async (stock_id, callback) => {
    if(!stock_id){
      callback('It wasnt provided the stock id, please repair')
    }else {
      History.find({ stock_id }, (error, result ) => {
        if(error)
          callback(error)
        else
          callback(error, result)
      }).clone()
    }
  }
}