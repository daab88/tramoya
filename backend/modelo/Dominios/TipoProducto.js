const mongoose = require("mongoose");

const tipoProductoSchema = mongoose.Schema({
  valor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TipoProducto", tipoProductoSchema);
