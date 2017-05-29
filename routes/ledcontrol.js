var express = require('express');
var router = express.Router();
const util = require('util')


/*
router.get("/", function(req, res){
  console.log('llego peticion GET')
  res.send('WHEEEEE')
})
*/
router.post("/", function(req, res){
  console.log('llego peticion POST AJAX')
  console.log(req.body)
  console.log('--parametros---');
  console.log(res.params);
  res.send('EJECUTADO')
})

module.exports = router
