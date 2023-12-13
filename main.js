//importacion de modulosy librerias
import path from "path";
import dotenv from "dotenv";
import express from "express";
import ejs from "ejs";
import mainRoutes from "./src/routes/mainRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import shopRoutes from "./src/routes/shopRoutes.js";
import { dbConect, dbCreate, dbSync } from "./src/config/conection.js";
dbConect();

dbSync();

dotenv.config();
const root = path.resolve();
//declaracion de variables
const app = express();

//constantes
const PORT = process.env.Port || 8080;
const ROOT = path.resolve();

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
app.set("views", path.resolve() + "/src/views");

app.listen(PORT, () =>
  console.log(`el sv esta funcionando en http://localhost:${PORT}`)
);
// //-------------rutas----------------------------
app.use("/", mainRoutes);
app.use("/shop", shopRoutes);
app.use("/login", authRoutes);
app.use("/admin", adminRoutes);
