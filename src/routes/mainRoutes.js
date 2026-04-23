//importacion de librerias
import express from "express";
import mainController from "../controllers/mainController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
//creo variables
const router = express.Router();

//metodos get

//home
router.get("/", asyncHandler(mainController.home));
router.get("/home", asyncHandler(mainController.home));
//contact
router.get("/contact", mainController.contact);
router.post("/contact", mainController.contact);
//about
router.get("/about", mainController.about);
//faqs
router.get("/faqs", mainController.faqs);
//--------export-------------s
export default router;
