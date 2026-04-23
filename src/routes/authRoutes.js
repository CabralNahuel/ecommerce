//importacion de librerias
import { registerValidation } from "../middlewares/loginMiddleware.js";
import express from "express";
import autController from "../controllers/authController.js";
import { validacion } from "../middlewares/validatorMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
//creo variables
const router = express.Router();

//---------metodos get------------

// /login
router.get("/", autController.getAuthLogin);

// login/logout
router.get("/logout", autController.getAuthLogout);

// /login/register
router.get("/register", autController.getAuthRegister);

//---------metodos post-------------------

// login/
router.post("/", asyncHandler(autController.postAuthLogin));

// /login/register
router.post(
  "/register",
  registerValidation,
  validacion,
  asyncHandler(autController.postAuthRegister)
);

// ---------export-----------------

export default router;
