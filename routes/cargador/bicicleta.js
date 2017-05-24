var express = require('express');
var router = express.Router();
var Bicicleta = require('../../models/bicicleta')
var Usuario = require('../../models/usuario')
var Tipo = require('../../models/tipo')

function findUser(req, res, next){
  console.log("entro en findUser : bicicleta")
  Usuario.findOne({codigo : req.body.usuario}, function(err, data){
    if(err) {
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    else {
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
      next();Type
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
  if(req.body.Usuario == null){
    res.status(404);
    res.json({
      message : "Resource with parameter expected Usuario" + req.body.Usuario + " not found",
      status : "error"
    })
  }
  else if(req.body.Tipo == null){
    res.status(404);
    res.json({
      message : "Resource with parameter expected Tipo " + req.body.Tipo + " not found",
      status : "error"
    })
  }
  else {
    console.log('AGREGAR BICI');
    nueva_bicicleta = new Bicicleta();
    console.log('-----nueva--------');
    console.log(nueva_bicicleta);
    nueva_bicicleta.Tipo = req.body.Tipo;
    nueva_bicicleta.Usuario = req.body.Usuario;
    nueva_bicicleta.nombre = req.body.nombre;
    console.log('-----llega--------');
    console.log(req.body);
    console.log('-----Actualizada--------');
    console.log(nueva_bicicleta);
    console.log('-----fin--------');
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
