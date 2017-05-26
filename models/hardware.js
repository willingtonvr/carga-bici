var mongoose = require('mongoose');

var hardwareSchema = mongoose.Schema({
    nombre : {type : String, required: true},
    device_address : {
          msb: Number,
          lsb: Number,
          },
    n_slots : Number,
    slot: [{numero: Number, estado:String}],
    voltaje: [{numero: Number, valor: Number}],
    corriente: [{numero: Number, valor:Number}]
  }, {versionKey: false}
)

module.exports = mongoose.model('Hardware', hardwareSchema);
