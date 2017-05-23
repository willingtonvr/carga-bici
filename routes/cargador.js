var express = require('express');
var router = express.Router();
var usuario = require('./cargador/usuario')
var bicicleta = require('./cargador/bicicleta')
var tipo = require('./cargador/tipo')
var Tipo = require('../models/tipo')

router.get("/", function(req, res){
  /*
  res.json({
    message : "Welcome to Charger API",
    endpoints : ["usuario", "bicicleta", "tipo"]
  })
  */
  Tipo.find(function (err, mods) {
  if (err) return console.error(err);
    res.render('pages/v_cargador',{
        modelos:mods
    })
  })

})

router.use('/usuario', usuario)
router.use('/bicicleta', bicicleta)
router.use('/tipo', tipo)

module.exports = router
