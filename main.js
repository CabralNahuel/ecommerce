//importacion de modulosy librerias
import express from "express";
// import mainRoutes from "../routes/mainRoutes.js";
// import admindRoutes from "../routes/adminRoutes.js";
// import authRoutes from "../routes/authRoutes.js";
// import shopRoutes from "../routes/shopRoutes.js";

//const mainRoutes = require('./src/routes/mainRoutes.js')

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
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// //-----------------------------------------------

// //-------------rutas----------------------------

// app.use("/", mainRoutes);
// app.use("/", admindRoutes);
// app.use("/", authRoutes);
// app.use("/", shopRoutes);

// //app
app.use(express.static("public"));
app.listen(PORT, () =>
  console.log(`el sv esta funcionando en http://localhost:${PORT}`)
);
app.get("/ping", (req, res) => {
  res.send("pong");
});
