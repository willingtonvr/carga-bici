var mongoose = require('mongoose');

var Hardware_historySchema = mongoose.Schema({
    nombre : {type : String, required: true},
    device_address : {
          msb: Number,
          lsb: Number,
          },
    updated: { type: Date, default: Date.now },
    variable:{nombre: String, slot: Number, valor:Number}
  }, {versionKey: false}
)

module.exports = mongoose.model('Hardware_history', Hardware_historySchema);
