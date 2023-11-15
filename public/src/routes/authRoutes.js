//importacion de librerias
import express from "express";
import autController from "../controllers/authController.js";
//creo variables
const router = express.Router();

//---------metodos get------------

// auth/login
router.get("/login", autController.getAuthLogin);

// auth/logout
router.get("/login", autController.getAuthLogout);

// /auth/register
router.get("/register", autController.getAuthRegister);

//---------metodos post-------------------

// auth/login
router.post("login", autController.postAuthLogin);

// /auth/register
router.post("/register", autController.postAuthRegister);

// ---------export-----------------

export default router;
