const productController = require('../../controllers/product')
const historyController = require('../../controllers/history')


module.exports = {
  CreateStock: async (req, res, next) => {
    const {
      product_id,
      establishment_id
    } = req

    if(!product_id || !establishment_id ) {
      res.status(400)
      res.send({error: "It werent provided the necessary items(establishment and product"})
    }else {
      productController.CreateStock(product_id, establishment_id, (error, result) => {
        if(error){
          res.status(400)
          res.send({error})
        }else{
          res.status(200)
          res.send(req.new_product)
        }
      })
    }
  },
  GetHistoryProduct: async (req, res, next) => {
    const {
      stock_id
    } = req
    if(!stock_id){
      res.status(400)
      res.send({error: 'It wasnt provided the stock id'})
    }else{
      historyController.GetHistory(stock_id, (error, result) => {
        if(error){
          res.status(400)
          res.send({error})
        }else{
          res.status(200)
          res.send(result)
        }
      })
    }
  }
}