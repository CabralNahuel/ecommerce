//importacion de modulosy librerias
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import express from "express";
import methodOverride from "method-override";
import mainRoutes from "./src/routes/mainRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import shopRoutes from "./src/routes/shopRoutes.js";
import { dbConect, dbSync } from "./src/config/conection.js";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import { sequelize } from "./src/config/conection.js";
import { fileURLToPath } from "url";
//import cokieparser from 'cookie-parser';

dotenv.config();

const appFilePath =
  typeof __filename !== "undefined"
    ? __filename
    : fileURLToPath(import.meta.url);
const appDirPath = path.dirname(appFilePath);
const isDirectRun = process.argv[1] === appFilePath;
const app = express();
const SequelizeStore = connectSessionSequelize(session.Store);

const pickExistingPath = (candidates, fallback) => {
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return fallback;
};

const viewsPath = pickExistingPath(
  [
    path.join(process.cwd(), "src", "views"),
    path.join(appDirPath, "src", "views"),
  ],
  path.join(appDirPath, "src", "views")
);

const publicPath = pickExistingPath(
  [
    path.join(process.cwd(), "public"),
    path.join(appDirPath, "public"),
  ],
  path.join(appDirPath, "public")
);

dbConect();
dbSync();

//constantes
const PORT = process.env.PORT || 4000;

//----------Session
const isProduction = process.env.NODE_ENV === "production";
const usePersistentSessionStore =
  isProduction || (process.env.USE_DB_SESSION || "false").toLowerCase() === "true";
const sessionStore = usePersistentSessionStore
  ? new SequelizeStore({
      db: sequelize,
      tableName: "sessions",
      checkExpirationInterval: 15 * 60 * 1000,
      expiration: 24 * 60 * 60 * 1000,
    })
  : null;

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "funkoshop",
    resave: false,
    saveUninitialized: false,
    ...(sessionStore ? { store: sessionStore } : {}),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

if (sessionStore) {
  sessionStore.sync();
}



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

app.use(express.static(publicPath));
app.set("view engine", "ejs");
app.set("views", viewsPath);
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
