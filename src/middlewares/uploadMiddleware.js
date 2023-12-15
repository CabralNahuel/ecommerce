import multer from "multer";
import { resolve } from "path";
const destination = (req, file, cb) => {
  console.log(file);

  cb(null, resolve() + "/public/assets/imagenes");
};

const filename = (req, file, cb) => {
  cb(null, Date.now() + "_" + file.originalname);
};
const config = { destination, filename };
const storage = multer.diskStorage(config);
export const uploadMiddleware = multer({ storage });
