const mongoose = require("mongoose");

const mesaSchema = mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
  pagos: {
    type: [String], // foreing key id del pago
    required: true,
  },
});

module.exports = mongoose.model("Mesa", mesaSchema);
