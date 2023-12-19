import multer from "multer";
import { resolve } from "path";
const destination = (req, file, cb) => {
  // console.log(req.body); obtengo los datos del formulario

  cb(null, resolve() + "/public/assets/imagenes"); //carpeta donde guarda los archivos//
};

const filename = (req, file, cb) => {
  const time = new Date()
    .toISOString()
    .replace(/ /g, "_")
    .replace(/:/g, "-")
    .slice(0, 10);
  console.log(time); //obtengo la fecha y hora del archivo jpg
  // console.log(file.originalname);obtengo el nombre del archivo jpg
  cb(null, time + "_" + file.originalname);
};
const config = { destination, filename };
const storage = multer.diskStorage(config);
export const uploadMiddleware = multer({ storage });
