//importacion de modulosy librerias
import express from "express";
import ejs from "ejs";


import mainRoutes from "./public/src/routes/mainRoutes.js";
import adminRoutes from "./public/src/routes/adminRoutes.js";
import authRoutes from "./public/src/routes/authRoutes.js";
import shopRoutes from "./public/src/routes/shopRoutes.js";
import path from "path";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const funkos = require("./funkos.json");
//console.log(funkos)

//declaracion de variables
const app = express();
const PORT = 4000;

//---------method override------------------------
// instalar con npm
// npm install method-override

// Override para habilitar los métodos PUT y DELETE

//const methodOverride = require('method-override');
//app.use(methodOverride('_method'));
//-------------------------------------------------

//----------- public ----------------------------
// para exponer el contenido de la carpeta public
//-----------------------------------------------

//traductor antes de la ruta

// -------------parsing data --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//------------------app------------------------------

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve() + "/public/src/views");
app.get("/", (req, res) => res.render("index"));

app.listen(PORT, () =>
  console.log(`el sv esta funcionando en http://localhost:${PORT}`)
);
// //-------------rutas----------------------------
app.use("/", mainRoutes);
app.use("/shop", shopRoutes);
app.use("/login", authRoutes);
app.use("/admin", adminRoutes);
