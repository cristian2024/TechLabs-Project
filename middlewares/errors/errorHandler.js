function errorHandler (error, req ,res, next){
  // aqui se validaran los tipos de errores
  // console.log("hereeeeeeeeeeee") 
  res.status(400)
  res.send(`${error.prototype.name}`)
}

module.exports = {
  errorHandler
}