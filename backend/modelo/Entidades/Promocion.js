const mongoose = require("mongoose");

const promocionSchema = mongoose.Schema({
  fechaIni: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  productos: {
    type: [String], // foreing key id del pedido
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Promocion", promocionSchema);
