var express = require('express');
var router = express.Router();
var hardware = require('../models/hardware')
router.get("/", function(req, res){
  //hardware.find({},function(err, hardwr){
  hardware.find(function (err, hardwr) {
  if (err) return console.error(err);
  //console.log(hardwr);
    res.render('pages/control',{estado:hardwr})


  })
})
module.exports = router
