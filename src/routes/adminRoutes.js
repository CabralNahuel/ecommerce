//importacion de librerias
import express from "express";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";
//creo variables
const router = express.Router();

import adminController from "../controllers/adminController.js";
import mainServices from "../services/mainServices.js";
//---------metodos get------------

// admin
router.get("/", adminController.getAdmin);

// /admin/create
router.get("/create", adminController.getAdminCreate);

// /admin/edit/:id
router.get("/edit/:id", adminController.getAdminEditId);

//---------metodos post-------------------

// /admin/create
router.post(
  "/create",
  uploadMiddleware.single("img_front"),
  mainServices.postProducts
);

//------------metodos put ----------------

// /admin/edit/:id
router.post("/edit/:id", mainServices.updProduct);

//------------metodos delete--------------

// /admin/delete/:id
router.delete("/delete/:id", adminController.deleteAdminDeleteId);

// ---------export-----------------

export default router;
