var express = require('express');
var router = express.Router();
var Hardware = require('../../models/hardware')
var Hardware_history = require('../../models/hardware_history')

function findHardware(req, res, next){
  //Hardware.find({codigo : req.params.device_address || req.body.device_address}, function(err, data){
  Hardware.find({nombre : req.params.nombre || req.body.nombre }, function(err, data){
  //Hardware.findOne({nombre : req.params.nombre || req.body.nombre }, function(err, data){

    if(err) {
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    else {
      req.hardware = data
      //console.log('---- objeto encontrado ---');
      //console.log(data);
      next();
    }
  })
}
function findAndSave(req, res, next){
  Hardware.findOne({nombre : req.params.nombre || req.body.nombre }, function(err, data){
    if(data ==null) {
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    else {
      // se que hay una forma mas elegante de hacerlo pero no la he descubierto
      //

      var upHardware = new Hardware(data)
      var hwr_histoy = new Hardware_history(req.body)
      var newData
      var updated
      var i=0
      for (var key in req.body ){
          i++;
      }
      if (i<8){
        updated = req.body
        newData = data

        if (typeof  updated.voltaje != 'undefined' ){
          newData.voltaje[updated.voltaje.numero-1].numero=updated.voltaje.numero
          newData.voltaje[updated.voltaje.numero-1].valor=updated.voltaje.valor
        }
        if (typeof  updated.corriente != 'undefined' ){
          newData.corriente[updated.corriente.numero-1].numero=updated.corriente.numero
          newData.corriente[updated.corriente.numero-1].valor=updated.corriente.valor
        }
        if (typeof  updated.temperatura != 'undefined' ){
          newData.temperatura[updated.temperatura.numero-1].numero=updated.temperatura.numero
          newData.temperatura[updated.temperatura.numero-1].valor=updated.temperatura.valor
        }
        if (typeof  updated.slot != 'undefined' ){
          //console.log('--- to update ---');
          //console.log(newData);
          //console.log('---- update ---');
          //console.log(updated);
          if (updated.slot[0].numero < newData.n_slots+1){
            newData.slot[updated.slot[0].numero-1].numero=updated.slot[0].numero
            newData.slot[updated.slot[0].numero-1].estado=updated.slot[0].estado
          }
        }
      }else {  // llego completo
        console.log('datos completos');
        newData = req.body
      }

      upHardware.update(newData, function (err){
        if (err) console.log(err);
        hwr_histoy.save(function(err){
          if (err) {
            console.log(err);
          }

          next();
        })
      })
    }
  })
}

router.get("/", function(req, res){

  Hardware.find({},function(err, data){
    if(err) {
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    else {
      emitChange.emitir(data)
      res.status(200);
      res.json({
        status : "success",
        payload : data
      })
    }
  })
})

router.post("/", findHardware, function(req, res){


  if(req.body.hardware == null ){
    nuevo_hardware = new Hardware()
    nuevo_hardware.device_address = req.body.device_address
    nuevo_hardware.nombre = req.body.nombre
    nuevo_hardware.n_slots = req.body.n_slots
    nuevo_hardware.slot = req.body.slot
    nuevo_hardware.voltaje = req.body.voltaje
    nuevo_hardware.corriente = req.body.corriente
    nuevo_hardware.temperatura = req.body.temperatura
    nuevo_hardware.save(function (err) {
      if(err) {
        res.status(500);
        res.json({error : 'Error saving object'})
      }
      else {
        res.status(201)
        res.json({
          status : "success",
          payload : nuevo_hardware,
          message : "object with id " + (req.params.nombre || req.body.nombre) + " created"
        })
      }
    })
  }
  else {
    res.status(409)
    res.json({
      status : "error",
      message : "object with id " + req.body.nombre + " already exist"
    })
  }
})

router.put("/:name", findAndSave, function(req, res){
  if(req.status == 500){
    res.status(409)
    res.json({
      status : "error",
      message : "object with Name " + req.body.nombre + " not exist"
    })

  }
  else {

    res.status(201)
    res.json({
      status : "success",
      //payload : req.body,
      message : "object with id " + (req.params.nombre || req.body.nombre) + " Updated"
    })
  }
})

router.get('/:nombre', findHardware, function(req, res){
  if(req.hardware == null){
    res.status(404);
    res.json({
      message : "Resource with parameter " + req.params.nombre + " not found",
      status : "error"
    })
  }
  else {
    res.status(200);
    res.json({
      status : "success",
      payload : req.hardware
    })
  }
})

router.delete('/:nombre', findHardware,function(req, res){
  if(req.hardware == null){
    res.status(404);
    res.json({
      message : "Resource with parameter " + req.params.nombre + " not found",
      status : "error"
    })
  }
  else {
    req.hardware.remove(function (err) {
      if(err) {
        res.status(500);
        res.json({error : 'Error removing object'})
      }
      else {
        res.status(200);
        res.json({
          status : "success",
          payload : req.hardware,
          message : "object with id " + req.params.nombre + " deleted"
        })
      }
    })
  }
})

module.exports = router
