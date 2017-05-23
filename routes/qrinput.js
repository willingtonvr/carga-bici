var express = require('express');
var router = express.Router();
var usuario = require('./cargador/usuario')
var bicicleta = require('./cargador/bicicleta')
var tipo = require('./cargador/tipo')

router.get("/", function(req, res){
  res.json({
    message : "QR Input message",
    endpoints : ["usuario", "bicicleta"]
  })
})

router.post("/", function(req, res){
  res.json({
    Usuario : req.body.usuario,
    bicicleta : req.body.bicicleta
  })
  console.log("se hizo peticion de bicicleta " + req.body.usuario )
})
module.exports = router
