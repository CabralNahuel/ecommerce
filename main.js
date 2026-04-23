//importacion de modulosy librerias
import path from "path";
import dotenv from "dotenv";
import express from "express";
import methodOverride from "method-override";
import mainRoutes from "./src/routes/mainRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import shopRoutes from "./src/routes/shopRoutes.js";
import { dbConect, dbSync } from "./src/config/conection.js";
import session from "express-session";
import { fileURLToPath } from "url";
//import cokieparser from 'cookie-parser';

dotenv.config();

const appFilePath = fileURLToPath(import.meta.url);
const appDirPath = path.dirname(appFilePath);
const isDirectRun = process.argv[1] === appFilePath;
const app = express();

dbConect();
dbSync();

//constantes
const PORT = process.env.PORT || 4000;

//----------Session
app.use(session({
  secret:'funkoshop', 
  resave: 'true',
  saveUninitialized : false, 
  //cookie:{maxAge:3000}
}))



//---------method override------------------------
// instalar con npm
// npm install method-override

// Override para habilitar los métodos PUT y DELETE

//const methodOverride = require('method-override');
app.use(methodOverride("_method"));
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
app.set("views", path.join(appDirPath, "src", "views"));
// //-------------rutas----------------------------
app.use("/", mainRoutes);
app.use("/shop", shopRoutes);
app.use("/login", authRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
  const titulo = "404";
  const error = { msj: "La pagina solicitada no existe." };
  res.status(404).render("error", { titulo, error });
});

app.use((err, req, res, next) => {
  console.error("Error no controlado:", err.message);

  const titulo = "Error";
  const error = { msj: "Ocurrio un error interno, intenta nuevamente." };

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).render("error", { titulo, error });
});

if (isDirectRun) {
  app.listen(PORT, () =>
    console.log(`el sv esta funcionando en http://localhost:${PORT}`)
  );
}

export default app;
