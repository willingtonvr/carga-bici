var express = require('express');
var router = express.Router();
var Usuario = require('../../models/usuario')
var Bicicleta = require('../../models/bicicleta')

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
function findUserandSave(req, res, next){
  console.log('---- find user and save ---');
  console.log(req.params.codigo);
  Usuario.findOne({codigo : req.params.codigo || req.body.codigo}, function(err, data){
    if(err) {
      console.log('error on find as save');
    }
    if(data != null){
        var id_bici = req.body.bicicletas[0]._id
        var newslot = req.body.bicicletas[0].slot
        var newuses = req.body.bicicletas[0].uses
        console.log('id bici:' + id_bici);
        console.log('new slot:'+ newslot);
        console.log('new uses:' + newuses);
        Bicicleta.findOne({_id : id_bici}, function(err, bici){
          if (err) {
            console.log('--- error find bici ----');
            console.log(err);
          } else {
          console.log('bici encontrada');
          console.log(bici);

          bici.update({slot:newslot,uses:newuses},function(err){
              if(err){
                console.log('update bici error');
                console.log(err);
              }
              res.status(201)
              next();
            })
          }

        })
    }else {
      console.log('usuario no existe');
      res.status(404)
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
    var nuevo_usuario = new Usuario()
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

router.put("/:codigo", findUserandSave, function(req, res){
  console.log('---- PUT USER---');
  if(req.status == 404){
    res.status(409)
    res.json({
      status : "error",
      message : "object with Name " + req.body.codigo + " not exist"
    })

  }
  else {

    res.status(201)
    res.json({
      status : "success",
      //payload : req.body,
      message : "object with id " + (req.body.codigo) + " Updated"
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
      select : 'nombre tipo uses slot',
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
