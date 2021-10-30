const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const ROLES = require("./middlewares/auth-user/roles");
// const User = require( "./models/Users" );



const app = express();

function main(){
  //body parser
  app.use(express.json()); 
  app.use(morgan('tiny'))
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

  // console.log('hola mundo')

  app.set('puerto', process.env.PORT || 3000)

  app.listen(app.get('puerto'), () => {
    console.log(`Listening http://localhost:${app.get('puerto')}`);
  });
  
}

main();