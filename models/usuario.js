var mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    nombre : {type : String, required: true},
    codigo : {type: String, required: true},
    bicicletas : [{type: mongoose.Schema.Types.ObjectId, ref: 'Bicicleta'}],
    estado :{type : String}, // estado del usuario
    nombre_bici : {type :String} 
  }, {versionKey: false}
)

module.exports = mongoose.model('Usuario', usuarioSchema);
