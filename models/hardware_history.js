var mongoose = require('mongoose');

var Hardware_historySchema = mongoose.Schema({
    nombre : {type : String, required: true},
    device_address : {
          msb: Number,
          lsb: Number,
          },
    updated: { type: Date, default: Date.now },
    voltaje: {numero: Number, valor: Number},
    corriente: {numero: Number, valor:Number},
    temperatura: {numero: Number, valor:Number}
  }, {versionKey: false}
)

module.exports = mongoose.model('Hardware_history', Hardware_historySchema);
