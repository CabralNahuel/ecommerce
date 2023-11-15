//importacion de librerias
import express from "express";

//creo variables
const router = express.Router();

import adminController from "../controllers/adminController.js";
//---------metodos get------------

// admin
router.get("/", adminController.getAdmin);

// /admin/create
router.get("/create", adminController.getAdminCreate);

// /admin/edit/:id
router.get("/edit/:id", adminController.getAdminEditId);

//---------metodos post-------------------

// /admin/create
router.post("/create", adminController.postAdminCreate);

//------------metodos put ----------------

// /admin/edit/:id
router.put("/edit/:id", adminController.putAdminEditId);

//------------metodos delete--------------

// /admin/delete/:id
router.delete("/delete/:id", adminController.deleteAdminDeleteId);

// ---------export-----------------

export default router;
