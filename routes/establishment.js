const express = require('express')
const router = express.Router()

const Establishment = require('../models/establishment')


// obtain establishments list
// the mongoose querys are asynchronous functions, thats why, it is important to use async/await
router.get('', async (req, res ) => {
  try {
    await Establishment.find({}, (error, result) => {
      //console.log("1")
      if(error) {
        res.status(400)
        res.send({completed: false, message: `it happened an unexpected error: ${error}`})
      }else{
        res.status(200)
        res.send(result)
        //res.send({completed: true, data: result})
      }
    }).clone();
  } catch (error) {
    res.status(400)
        res.send({completed: false, message: `it happened an unexpected error: ${error}`})
  }
})

router.post('', async (req, res) => {
  const {
    establishment_name,
    establishment_type,
    city_id,
    district,
    schedule,
    qualification,
    phone
  } = req.body;
  try {
    // creating the new Establishment model
    const newEstablishment = new Establishment({
      establishment_name,
      establishment_type,
      city_id,
      district,
      schedule,
      qualification,
      phone
    })
    
    // saving the model
    await newEstablishment.save((error)=>{
      if(error){
        res.status(400)
        res.send({completed: false, message: `it happened an unexpected error: ${error}`})
      } else {
        res.status(200)
        res.send({completed: true, data: newEstablishment})
      }
    })

    
    
  } catch (error) {
    res.status(400)
    res.send({completed: false, message: `it happened an unexpected error: ${error}`})
  }
})

module.exports = router;