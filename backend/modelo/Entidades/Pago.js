const mongoose = require("mongoose");

const pagoSchema = mongoose.Schema({
  producto: {
    type: [String], // foreing key id del producto
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  completadoPor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pago", pagoSchema);
