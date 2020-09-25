const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
  codigo: {
    type: String,
    required: [true, ""],
    unique: true,
    index: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    require: true,
    min: 0,
  },

  //stock
});

module.exports = mongoose.model("producto", productoSchema);
