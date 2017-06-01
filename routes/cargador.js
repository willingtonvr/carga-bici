var express = require('express');
var router = express.Router();
var usuario = require('./cargador/usuario')
var bicicleta = require('./cargador/bicicleta')
var hardware = require('./cargador/hardware')
var tipo = require('./cargador/tipo')
var Tipo = require('../models/tipo')
var emitChange = hardware.emitChange
var watcher = emitChange()
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
router.use('/hardware', hardware)

watcher.on('hardware-get',function(data){
  console.log('hubo get');
  //router.emit('cargador-hardware-get',data)
})
watcher.start()
module.exports = router
