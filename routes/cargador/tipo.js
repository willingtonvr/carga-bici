var express = require('express');
var router = express.Router();
var Tipo = require('../../models/tipo')

function findType(req, res, next){
  console.log("FIND-->"  + req.body.nombre)
  //Tipo.findOne({nombre : req.body.nombre}, function(err, data){
  Tipo.findOne({nombre : req.params.nombre || req.body.nombre}, function(err, data){
    console.log("----->"  + req.body.nombre)
    if(err) {
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    else {
      console.log("encontro: ");
      console.log(data)
      req.tipo = data
      console.log('enviando');
      console.log(req.tipo)
      next();
    }
  })
}

router.get('/', function(req, res){
  Tipo.find({},function(err, data){
    if(err) {
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    else {
      res.status(200);
      res.json({
        status : "suscess",
        payload : data
      })
    }
  })
})
router.get('/:nombre', findType, function(req, res){
  if(req.tipo == null){
    res.json({
      message : "Resource with name " + req.params.nombre + " not found",
      status : "error"
    })
  }
  else{
        res.status(200);
        res.json({
          status : "suscess",
          payload : req.tipo
        })
      }
 })

router.post('/', function(req, res){
  console.log('entra');
  console.log(req.body)
  nuevo_tipo = new Tipo();
  console.log('constructor');
  console.log(nuevo_tipo);
  nuevo_tipo.nombre = req.body.nombre
  nuevo_tipo.voltaje = req.body.voltaje
  console.log('update');
  console.log(nuevo_tipo);
  nuevo_tipo.save(function(err){
    if(err){
      console.log(err);
      res.status(500);
      res.json({error : 'Error creating object'})
    }
    else {
      res.status(201)
      res.json({
        status : "suscess",
        payload : nuevo_tipo,
        message : "object with name " + req.body.nombre + " created"
      })
    }
  })
})

router.delete('/:nombre', findType, function(req, res){
  if(req.tipo == null){
    res.status(404);
    res.json({
      message : "Resource with parameter " + req.params.nombre + " not found",
      status : "error"
    })
  }
  else {
    req.tipo.remove(function (err) {
      if(err) {
        res.status(500);
        res.json({error : 'Error saving object'})
      }
      else {
        res.status(200);
        res.json({
          status : "suscess",
          payload : req.tipo,
          message : "object with id " + req.params.nombre + " deleted"
        })
      }
    })
  }
})

module.exports = router
