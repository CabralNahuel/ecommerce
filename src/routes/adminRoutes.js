//importacion de librerias
import express from "express";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
//creo variables
const router = express.Router();

import adminController from "../controllers/adminController.js";
import mainServices from "../services/mainServices.js";
//---------metodos get------------

// admin
router.get("/", asyncHandler(adminController.getAdmin));

// /admin/create
router.get("/create", asyncHandler(adminController.getAdminCreate));

// /admin/edit/:id
router.get("/edit/:id", asyncHandler(adminController.getAdminEditId));

//---------metodos post-------------------

// /admin/create
router.post(
  "/create",
  uploadMiddleware.single("img_front"),
  asyncHandler(mainServices.postProducts)
);

//------------metodos put ----------------

// /admin/edit/:id
router.post("/edit/:id", asyncHandler(mainServices.updProduct));

//------------metodos delete--------------

// /admin/delete/:id
router.delete("/delete/:id", asyncHandler(adminController.deleteAdminDeleteId));

// ---------export-----------------

export default router;
