var express = require('express');
var router = express.Router();
var client = require('../db');

function findObject(req, res, next){
  client.get(req.params.id, function(err, object){
    if(err){
      res.status(500);
      res.json({error : 'Error looking for object'})
    }
    req.object = JSON.parse(object)
    next();
  })
}

router.get("/:id/:parameter", findObject, function(req, res){
  if(req.object == null){
    res.status(404);
    res.json({
      message : "Resource with id " + req.params.id + " not found",
      status : "error"
    })
  }
  else {
    if(req.object[req.params.parameter] == null){
      res.status(404);
      res.json({
        message : "Resource with parameter " + req.params.parameter + " not found",
        status : "error"
      })
    }
    else {
      res.status(200);
      res.json({
        status : "suscess",
        payload : req.object[req.params.parameter]
      })
    }
  }
})

router.post("/:id/:parameter", findObject, function(req, res){
  if(req.object == null){
    res.status(404);
    res.json({
      message : "Resource with id " + req.params.id + " not found",
      status : "error"
    })
  }
  else {
    console.log(req.body)
    req.object[req.params.parameter] = req.body.payload
    console.log(req.object)
    client.set(req.params.id, JSON.stringify(req.object))
    res.status(201);
    res.json({
      status : "suscess",
      payload : req.object
    })
  }
})

router.get("/:id", findObject, function(req, res){
  if(req.object == null){
    res.status(404)
    res.json({
      status : "error",
      message : "object not found"
    })
  }
  else {
    res.status(200)
    res.json({
      status : "suscess",
      payload : req.object
    })
  }
})

router.post("/:id", findObject, function(req, res){
  if (req.object == null){
    client.set(req.params.id, JSON.stringify(req.body))
    res.status(201)
    res.json({
      status : "suscess",
      payload : req.body,
      message : "object with id " + req.params.id + " created"
    })
  }
  else {
    res.status(409)
    res.json({
      status : "error",
      message : "object with id " + req.params.id + " already exist"
    })
  }
})

router.delete("/:id", findObject, function(req, res){
  if (req.object == null){
    res.status(404);
    res.json({
      message : "error, resource with id " + req.params.id + " not found",
      status : "error"
    })
  }
  else {
    client.del(req.params.id);
    res.status(200);
    res.json({
      status : "suscess",
      payload : req.object,
      message : "item deleted"
    })
  }
})

router.put("/:id", findObject, function(req, res){
  if(req.object == null){
    res.status(404);
    res.json({
      message : "Resource with id " + req.params.id + " not found",
      status : "error"
    })
  }
  else {
    client.set(req.params.id, JSON.stringify(req.body))
    res.status(201)
    res.json({
      status : "suscess",
      payload : req.body,
      message : "object with id " + req.params.id + " created"
    })
  }
})

module.exports = router
