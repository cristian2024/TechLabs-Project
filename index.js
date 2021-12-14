const express = require("express");
const morgan = require("morgan");
const cors = require("cors")

const mongoose = require("mongoose");
// console.log('hola mundo')
const errorHandler = require('./middlewares/errors/errorHandler')
// const ROLES = require("./middlewares/auth-user/roles");
// const User = require( "./models/Users" );



const app = express();

function main(){
  //body parser
  app.use(express.json()); 
  app.use(morgan('tiny'))
  app.use(errorHandler.errorHandler)
  app.use(cors())
  
  // app.use(ROLES);
  //
  const username = 'izar';
  const password = 'nS7Nk1MldNdcd1YM';
  const database = 'TechLabs-Project';
  
  const uri = `mongodb+srv://${username}:${password}@cluster0.d3bkk.mongodb.net/${database}?retryWrites=true&w=majority`;
  const options = { useNewUrlParser: true, useUnifiedTopology: true }
  

  mongoose.connect(uri, options).then(
    () => { 
      console.log('Conectado a DB') 
      // User.create({
      //   // document: 1000831234,
      //   username: 'Lalo',
      //   password: 'lambda',
      // })
    },
    err => { console.log(err) }
  )
  
  app.use('/api/authentication', require('./routes/auth'))
  app.use('/api/establishment',require('./routes/establishment'))
  app.use('/api/products', require('./routes/product'))
  // console.log('hola mundo')
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.set('puerto', process.env.PORT || 3001)

  app.listen(app.get('puerto'), () => {
    console.log(`Listening http://localhost:${app.get('puerto')}`);
  });
  
}

main();