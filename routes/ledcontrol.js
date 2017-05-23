var express = require('express');
var router = express.Router();
const util = require('util')



router.get("/", function(req, res){
  console.log('llego peticion GET')
  res.send('WHEEEEE')
})

router.post("/", function(req, res){
  console.log('llego peticion POST')
  console.log('----------------')
  //console.log(util.inspect(req.b, true, null))
  console.log('hola '+ req.body.Hola)
  res.send(' LED ACTIVADO ')
})

module.exports = router
