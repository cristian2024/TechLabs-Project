const express = require('express')
const router = express.Router()

const Product = require("../models/Product")
const types = require("../utils/Types")

router.get("/list-types",(req,res) => {
  res.status(200)
  res.send(types)
})

module.exports = router