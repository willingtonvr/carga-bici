var mongoose = require('mongoose');

var tipoSchema = mongoose.Schema({
    nombre : {type : String, required : true},
    voltaje : {type : Number, required : true}
  }, {versionKey: false}
)

module.exports = mongoose.model('Tipo', tipoSchema);
