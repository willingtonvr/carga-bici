var express = require('express');
var router = express.Router();

var User = require('../models/usuario')

router.get("/", function(req, res){
  /*
  res.json({
    message : "Welcome to Charger API",
    endpoints : ["usuario", "bicicleta", "tipo"]
  })
  */
  User.find(function (err, usrs) {
  if (err) return console.error(err);
    res.render('pages/usuarios',{
        users:usrs
    })
  })

})

module.exports = router
