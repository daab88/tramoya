const express = require("express");
const ruteador = express.Router();
const Mesa = require("../modelo/Mesa");

ruteador.get("/", (req, res) => {
  Mesa.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.get("/:id", (req, res) => {
  Mesa.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.post("/", (req, res) => {
  const mesa = new Mesa({
    descripcion: req.body.descripcion,
    pagos: req.body.pagos,
  });

  mesa
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
  Mesa.remove({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.patch("/:id", (req, res) => {
  Mesa.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.get("/:id/pago", (req, res) => {
  let json = [];
  Mesa.findById(req.params.id)
    .then((data) => {
      const buscarPago = (indice, tope) => {
        Pago.findById(data.pagos[indice])
          .then((pago) => {
            json.push(pago);
            if (indice < tope) {
              buscarPago(indice + 1, tope);
            } else {
              res.status(200).json(json);
            }
          })
          .catch((err) => {
            res.status(403).json(err);
          });
      };
      buscarProducto(0, data.pagos.length);
    })
    .catch((err) => {
      res.status(403).json(err);
    });
});

ruteador.post("/:id/pago", (req, res) => {
  Mesa.findById(req.params.id)
    .then((mesa) => {
      mesa.pagos.push(req.body);
      mesa
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
