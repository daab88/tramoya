const express = require("express");
const Producto = require("../modelo/Entidades/Producto");
const ruteador = express.Router();
const Promocion = require("../modelo/Promocion");

ruteador.get("/", (req, res) => {
  Promocion.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.get("/:id", (req, res) => {
  Promocion.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.post("/", (req, res) => {
  const promocion = new Promocion({
    fechaIni: req.body.descripcion,
    fechaFin: req.body.pagos,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    productos: req.body.productos,
  });

  promocion
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
  Promocion.remove({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.patch("/:id", (req, res) => {
  Promocion.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.get("/:id/producto", (req, res) => {
  let json = [];
  Promocion.findById(req.params.id)
    .then((data) => {
      const buscarProducto = (indice, tope) => {
        Producto.findById(data.productos[indice])
          .then((producto) => {
            json.push(producto);
            if (indice < tope) {
              buscarProducto(indice + 1, tope);
            } else {
              res.status(200).json(json);
            }
          })
          .catch((err) => {
            res.status(403).json(err);
          });
      };
      buscarProducto(0, data.productos.length);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.post("/:id/producto", (req, res) => {
  Promocion.findById(req.params.id)
    .then((promo) => {
      promo.productos.push(req.body);
      promo
        .save()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          if (err.message.indexOf("duplicate key error") !== -1)
            res.status(403).json({ error: "Clave duplicada" });
          else res.status(403).json(err);
        });
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

module.exports = ruteador;
