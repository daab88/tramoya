const express = require("express");
const ruteador = express.Router();
const Producto = require("../modelo/Producto");

ruteador.get("/", (req, res) => {
  Producto.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.get("/:id", (req, res) => {
  Producto.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.post("/", (req, res) => {
  const producto = new Producto({
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    tipo: req.body.tipo,
  });

  producto
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err.message.indexOf("duplicate key error") !== -1)
        res.status(403).json({ error: "Clave duplicada" });
      else res.status(403).json(err);
    });
});

ruteador.delete("/:id", (req, res) => {
  Producto.remove({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.patch("/:id", (req, res) => {
  Producto.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

module.exports = ruteador;
