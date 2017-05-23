var mongoose = require('mongoose');

var bicicletaSchema = mongoose.Schema({
    tipo : {type: mongoose.Schema.Types.ObjectId, ref: 'Tipo'},
    nombre : {type : String, default: "Bicicleta"},
    usuario : {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
  }, {versionKey: false}
)

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
