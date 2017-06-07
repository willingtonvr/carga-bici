var express = require('express');
var router = express.Router();

var Bicicleta = require('../models/bicicleta')

router.get("/", function(req, res){
  /*
  res.json({
    message : "Welcome to Charger API",
    endpoints : ["usuario", "bicicleta", "tipo"]
  })
  */
  Bicicleta.find(function (err, bicis) {
    //console.log(bicis);

    if (err) return console.error(err);
    res.render('pages/bicicletas',{
        bici:bicis
    })
  })

})

module.exports = router
