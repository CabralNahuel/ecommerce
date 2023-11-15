//importacion de librerias
import express from "express";
import path from "path";
import shopController from "../controllers/shopController.js";

//creo variables
const router = express.Router();
const root = path.resolve();

//---------metodos get------------

//shop
router.get("/", shopController.getShop);

// shop/item/:id
router.get("/item/:id", shopController.getShopItemId);

// /shop/cart
router.get("/cart", shopController.getShopCart);

//---------metodos post-------------------

// /shop/cart
router.post("/cart", shopController.postShopCart);

// /shop/item/:id/add
router.post("/item/:id/add", shopController.postShopItemIdAdd);

// ---------export-----------------

export default router;
