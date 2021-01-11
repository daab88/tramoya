const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(
  cors({
    origin: "http://localhost",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(bodyParser.json());
const productosRuta = require("./controladores/Producto");
const mesaRuta = require("./controladores/Mesa");
const promoRuta = require("./controladores/Promocion");
//const mesaRuta = require("./controladores/Mesa");
app.use("/producto", productosRuta);
app.use("/mesa", mesaRuta);
app.use("/promocion", promoRuta);

//db
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Conectado a la db OK...")
);

//Listen
app.listen(5000);
