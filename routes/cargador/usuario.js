var express = require('express');
var router = express.Router();
var Usuario = require('../../models/usuario')

function findUser(req, res, next){
  Usuario.findOne({codigo : req.params.codigo || req.body.codigo}, function(err, data){
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

router.get("/", function(req, res){
  Usuario.find({},function(err, data){
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

router.post("/", findUser, function(req, res){
  if(req.user == null){
    nuevo_usuario = new Usuario()
    nuevo_usuario.codigo = req.body.codigo
    nuevo_usuario.nombre = req.body.nombre
    nuevo_usuario.save(function (err) {
      if(err) {
        res.status(500);
        res.json({error : 'Error saving object'})
      }
      else {
        res.status(201)
        res.json({
          status : "success",
          payload : nuevo_usuario,
          message : "object with id " + (req.params.codigo || req.body.codigo) + " created"
        })
      }
    })
  }
  else {
    res.status(409)
    res.json({
      status : "error",
      message : "object with id " + req.body.codigo + " already exist"
    })
  }
})

router.get('/:codigo', findUser, function(req, res){
  if(req.user == null){
    res.status(404);
    res.json({
      message : "Resource with parameter " + req.params.codigo + " not found",
      status : "error"
    })
  }
  else {
    req.user.populate({
      path : 'bicicletas',
      select : 'nombre tipo',
      populate : {
        path : 'tipo'
      }
    }, function(err, user){
      if(err){
        res.status(500);
        res.json({error : 'Error populating object'})
      }
      else {
        res.status(200);
        res.json({
          status : "success",
          payload : user
        })
      }
    })
  }
})

router.delete('/:codigo', findUser,function(req, res){
  if(req.user == null){
    res.status(404);
    res.json({
      message : "Resource with parameter " + req.params.codigo + " not found",
      status : "error"
    })
  }
  else {
    req.user.remove(function (err) {
      if(err) {
        res.status(500);
        res.json({error : 'Error saving object'})
      }
      else {
        res.status(200);
        res.json({
          status : "success",
          payload : req.user,
          message : "object with id " + req.params.codigo + " deleted"
        })
      }
    })
  }
})

module.exports = router
