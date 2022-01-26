const Product = require( "../models/Product" );
const Establishment = require("../models/establishment")
const Stock = require("../models/Stock")


// async function newHistoryProduct(req, res, next) {
//   const {
//     product_id,
//     establishment_id,
//     quantity,
//   }


// }

module.exports = {
  CreateStock: (product_id, establishment_id, callback)=> {
    const amount = 0

    if(!product_id || !establishment_id){
      callback("You havent provide the necessary variables")
    }else{
      try {
        const stock =  new Stock({
          product_id,
          establishment_id,
          stock: amount
        })

        stock.save((error)=> {
          if(error)
            callback(error)
          else
            callback(error, stock)
          
        }).clone()
      } catch (error) {
        callback(error)
      }
    }
  },
}