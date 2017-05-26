var express = require('express');
var router = express.Router();
var Hardware = require('../../models/hardware')

function findHardware(req, res, next){
  //Hardware.findOne({codigo : req.params.device_address || req.body.device_address}, function(err, data){
  Hardware.findOne({nombre : req.params.nombre}, function(err, data){
console.log(req.params);
    if(err) {
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    else {
      req.hardware = data
      console.log(data);
      next();
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
      res.status(200);
      res.json({
        status : "success",
        payload : data
      })
    }
  })
})

router.post("/", findHardware, function(req, res){

  if(req.hardware == null){
    nuevo_hardware = new Hardware()
    nuevo_hardware.device_address = req.body.device_address
    nuevo_hardware.nombre = req.body.nombre
    nuevo_hardware.n_slots = req.body.n_slots
    nuevo_hardware.slot = req.body.slot
    nuevo_hardware.voltaje = req.body.voltaje
    nuevo_hardware.corriente = req.body.corriente

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
