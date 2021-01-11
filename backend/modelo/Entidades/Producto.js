const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
  descripcion: {
    type: String,
    required: true,
  },
  tipo: {
    type: String, //dominio TipoProducto
    required: true,
  },
  precio: {
    type: Number,
    require: true,
    min: 0,
  },
});

module.exports = mongoose.model("Producto", productoSchema);
