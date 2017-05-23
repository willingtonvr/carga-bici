var express = require('express');
var router = express.Router();
var usuario = require('./cargador/usuario')
var bicicleta = require('./cargador/bicicleta')
var tipo = require('./cargador/tipo')

router.get("/", function(req, res){
  /*
  res.json({
    message : "Welcome to Charger API",
    endpoints : ["usuario", "bicicleta", "tipo"]
  })
  */
  var modelos = [
        { name: '48 V', voltage: 48 },
        { name: '36 V', voltage: 36 },
        { name: '24 V', voltage: 24 }
    ]
  res.render('pages/v_cargador',{
    modelos: modelos
  })
})

router.use('/usuario', usuario)
router.use('/bicicleta', bicicleta)
router.use('/tipo', tipo)

module.exports = router
