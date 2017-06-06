var express = require('express');
var router = express.Router();
var hardware = require('../models/hardware')
var hardware_history = require('../models/hardware_history')

router.get("/", function(req, res){
  //hardware.find({},function(err, hardwr){
  hardware.find(function (err, hardwr) {
    if (err) return console.error(err);
  //console.log(hardwr);
    //hardware_history.find({'variable.nombre':'voltaje'},function(err,volt_his){
    hardware_history.find(function(err,his){

        if (err) {
          console.log('error en Hardware_history');
          console.error(err);
          return
        }
        //sacamos los promedios antes de enivarlos a la vista
        var prom1V=0
        var prom2V=0
        var prom3V=0
        var prom4V=0

        var prom1C=0
        var prom2C=0
        var prom3C=0
        var prom4C=0

        var prom1T=0
        var prom2T=0
        var prom3T=0
        var prom4T=0
        var n=1
        //console.log(his);
        for (var i = 0; i < his.length; i++) {
              switch (his[i].variable.nombre) {
                case 'voltaje':
                    if (his[i].variable.slot ==1 ) prom1V+= parseFloat(his[i].variable.valor)
                    if (his[i].variable.slot ==2 ) prom2V+= parseFloat(his[i].variable.valor)
                    if (his[i].variable.slot ==3 ) prom3V+= parseFloat(his[i].variable.valor)
                    if (his[i].variable.slot ==4 ) prom4V+= parseFloat(his[i].variable.valor)
                break;
                case 'temperatura':
                    if (his[i].variable.slot ==1 ) prom1T+= parseFloat(his[i].variable.valor)
                    if (his[i].variable.slot ==2 ) prom2T+= parseFloat(his[i].variable.valor)
                    if (his[i].variable.slot ==3 ) prom3T+= parseFloat(his[i].variable.valor)
                    if (his[i].variable.slot ==4 ) prom4T+= parseFloat(his[i].variable.valor)

                break;
                case 'corriente':
                    if (his[i].variable.slot ==1 ) prom1C+= parseFloat(his[i].variable.valor)
                    if (his[i].variable.slot ==2 ) prom2C+= parseFloat(his[i].variable.valor)
                    if (his[i].variable.slot ==3 ) prom3C+= parseFloat(his[i].variable.valor)
                    if (his[i].variable.slot ==4 ) prom4C+= parseFloat(his[i].variable.valor)
                break;
              }
              n=i+1
        }

        prom1C/=n;prom1T/=n;prom1V/=n;
        prom2C/=n;prom2T/=n;prom2V/=n;
        prom3C/=n;prom3T/=n;prom3V/=n;
        prom4C/=n;prom4T/=n;prom4V/=n;
        var proms= {
          promedios:{}
        }
        var promedios={}

        promedios.prom1T=prom1T;
        promedios.prom2T=prom2T;
        promedios.prom3T=prom3T;
        promedios.prom4T=prom4T;

        promedios.prom1V=prom1V;
        promedios.prom2V=prom2V;
        promedios.prom3V=prom3V;
        promedios.prom4V=prom4V;

        promedios.prom1C=prom1C;
        promedios.prom2C=prom2C;
        promedios.prom3C=prom3C;
        promedios.prom4C=prom4C;
        proms.promedios=promedios
        //console.log(proms);
        res.render('pages/hardware',{estado:hardwr,estadistica:proms })
    })

  })
})
module.exports = router
