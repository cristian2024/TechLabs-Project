const stockController = require('../../controllers/stock')

module.exports = {
  /**
   * Calculate the stock_id 
   * the requirement.body must contain establishment_id and product_id, or the stock_id
   */
  GetStockId: async (req, res, next) => {
    const {
      establishment_id,
      product_id,
      stock_id
    }= req.body

    try {
      if (stock_id){
        req.stock_id= stock_id
        next()
      }
      //Validando que se tengan todos los items necesarios
      else if(!establishment_id || !product_id){
        res.status(400)
        res.send({error: 'Falta alguno o ambos de los ids necesarios'})
      } else {
        // usando el controlador de stock en el cual se encuentran las funciones para busqueda de datos
        stockController.GetStockId(product_id, establishment_id, (error, result)=> {
          if(error){
            res.status(400)
            res.send({error})
          }else {
            // el dato que llega desde el controlador es el id del stock
            req.stock_id = result
            next()
          }
        })
      }
    } catch (error) {
      res.status(400)
      res.send({error})
    }
  },
  HasStock: async (req, res, next) => {
    const {
      stock_id,
      amount
    }
    if(!stock_id){
      res.status(400)
      res.send({error: 'You need to provide the stock_id'})
    }else{
      try {
        stockController.HasStock(stock_id, amount, (error, result) => {
          if(error){
            res.status(400)
            res.send({error})
          }else{
            req.hasStock = result
          }
        })
      } catch (error) {
        res.status(400)
        res.send({error})
      }
    }
    
  },
  GetStock: async (req, res, next) => {
    const {
      stock_id
    } = req.stock_id
    if(!stock_id){
      res.status(400)
      res.send("it is necessary to provide the stock_id")
    }else{
      stockController.GetStock(stock_id, (error, result) => {
        if(error){
          res.status(400)
          res.send(error)
        }else{
          try {
            res.status(200)
            res.send(result)
          } catch (error) {
            res.status(400)
            res.send(error)
          }
        }
      })
    }
  }
}