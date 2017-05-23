var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan')

var cargador = require('./routes/cargador')
var qrinput = require('./routes/qrinput')
var status = require('./routes/status')
var ledcontrol = require('./routes/ledcontrol')
var usuarios = require('./routes/usuarios')
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost:27017/sda");

app.use(morgan('short'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
// zona rest
app.use('/cargador', cargador)
app.use('/usuarios',usuarios)
app.use('/qrinput', qrinput)
app.use('/status', status)
app.use('/ledcontrol', ledcontrol)
app.get('/', function(req, res) {
    res.render('pages/index')
});
// zona de interface de usuario

app.get('/bicicletas', function(req, res) {

    res.render('pages/bicicletas')
})
app.get('/about', function(req, res) {
    res.render('pages/about')
})

app.all('*', function(req, res) {
  res.redirect("/");
})

module.exports = app
