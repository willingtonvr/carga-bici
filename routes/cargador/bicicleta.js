var express = require('express');
var router = express.Router();
var Bicicleta = require('../../models/bicicleta')
var Usuario = require('../../models/usuario')
var Tipo = require('../../models/tipo')

function findUser(req, res, next){
  console.log('--- buscando ---');
  console.log(req.body);
  Usuario.findOne({codigo : req.body.usuario.codigo}, function(err, data){
    if(err) {
      res.status(500);
      res.json({error : 'Error looking for user '})
    }
    else {
      console.log('--- encontro ---');
      console.log(data);
      req.user = data
      next();
    }
  })
}

function findType(req, res, next){
  console.log("entro en findType: bicicleta")
  Tipo.findOne({nombre : req.body.Tipo.nombre}, function(err, data){
    if(err) {
      console.log('err: '+ err);
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    else {
      req.tipo = data
      next();
    }
  })
}

function findBicicle(req, res, next){
  console.log("entro en findBicicle: bicicleta")
  Bicicleta.findOne({nombre : req.params.nombre}, function(err, data){
    if(err) {
      console.log('err: '+ err);
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    else {
      req.bicicleta = data
      next();
    }
  })
}

router.get('/', function(req, res){
  Bicicleta.find({},function(err, data){
    if(err) {
      console.log('err: '+ err);
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

router.post('/', findUser, findType, function(req, res){
  console.log("entro en post: bici")
  console.log(req.body)
  if(req.body.Tipo == null){
    res.status(404);
    res.json({
      message : "Resource with parameter expected Tipo " + req.body.Tipo + " not found",
      status : "error"
    })
  }
  else {
    nueva_bicicleta = new Bicicleta();
    nueva_bicicleta.tipo = req.tipo;
    nueva_bicicleta.usuario = req.user;
    nueva_bicicleta.nombre = req.body.nombre;
    nueva_bicicleta.slot = req.body.slot;
    nueva_bicicleta.power = req.body.power;
    nueva_bicicleta.uses = req.body.uses;
    nueva_bicicleta.save(function(err){
      if(err){
        console.log("error" + err)
        res.status(500);
        res.json({error : 'Error creating object'})
      }
      else{
        req.user.update({$push : {'bicicletas' : nueva_bicicleta}},
        function(err){
          if(err){
            res.status(500);
            res.json({error : 'req.body.Usuario.updatereq.body.Usuario.update -- Error updating object'})
          }
          else{
            res.status(201)
            res.json({
              status : "success",
              payload : nueva_bicicleta,
              message : "object with name " + req.body.nombre + " created"
            })
          }
        })
      }
    })
  }
})

router.get('/:nombre', findBicicle, function(req, res){
  if(req.bicicleta == null){
    res.json({
      message : "Resource with name " + req.params.nombre + " not found",
      status : "error"
    })
  }
  else{
    req.bicicleta.populate([{
        path : 'tipo'
      },{
        path : 'usuario',
        select : 'nombre codigo'
      }
    ], function (err, bicicleta) {
      if(err){
        res.status(500);
        res.json({error : 'Error populating object'})
      }
      else {
        res.status(200);
        res.json({
          status : "success",
          payload : bicicleta
        })
      }
    })
  }
})

router.delete('/:nombre', findUser, findBicicle, function(req, res){
  if(req.bicicleta == null){
    res.status(404);
    res.json({
      message : "Resource with name" + req.params.nombre + " not found",
      status : "error"
    })
  }
  else {
    req.user.update({$pull:{'bicicletas': req.bicicleta._id}}, function(err){
      if(err){
        res.status(500);
        res.json({error : 'Error updating object'})
      }
      else {
        req.bicicleta.remove(function (err){
          if(err){
            res.status(500);
            res.json({error : 'Error removing object'})
          }
          else {
            res.status(200);
            res.json({
              status : "success",
              payload : req.bicicleta,
              message : "item deleted"
            })
          }
        })
      }
    })
  }
})

module.exports = router
