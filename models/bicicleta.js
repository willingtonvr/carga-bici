var mongoose = require('mongoose');

var bicicletaSchema = mongoose.Schema({
    nombre : {type : String, default: "Bicicleta"},
    tipo : {type: mongoose.Schema.Types.ObjectId, ref: 'Tipo'},
    usuario : {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    estado: String,
    slot: {type : Number, required : true},
    power: Number,
    uses: Number
  }, {versionKey: false}
)

module.exports = mongoose.model('Bicicleta', bicicletaSchema);
