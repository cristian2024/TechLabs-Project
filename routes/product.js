const express = require('express');
const router = express.Router()


const { setUser, authRole } = require( '../middlewares/auth-user/auth' );
const ROLES = require( '../middlewares/auth-user/roles' );


const Product = require("../models/Product")
const types = require("../utils/Types")

router.get("/list-types",(req,res) => {
  res.status(200)
  res.send(types)
})

router.post('/new-product', setUser, authRole([ROLES.ESTABLISHMENT]) ,(req, res) => {
  const {
    product_type,
    product_name,
    description,
    elaboration_date,
  } = req.body
  
  try{
    const producto = new Product({
      establishment_id: req.userData.rol.rol_id,
      product_type,
      product_name,
      description,
      elaboration_date,
    })

    producto.save((err)=> {
      if(err){
        
        res.status(400)

        res.send({ message: "se presento un error en la creacion del producto", err})
      }else{
        res.status(200)
        res.send({ data: producto, completed: true})
      }
    })
  }catch(error){
    console.log(error)
    res.status(400)
    res.send({ message: "se presento un error en la creacion del producto", error})
  }
})

module.exports = router