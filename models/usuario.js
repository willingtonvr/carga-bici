var mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    nombre : {type : String, required: true},
    codigo : {type: String, required: true},
    bicicletas : [{type: mongoose.Schema.Types.ObjectId, ref: 'Bicicleta'}]
  }, {versionKey: false}
)

module.exports = mongoose.model('Usuario', usuarioSchema);
