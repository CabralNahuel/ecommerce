//importacion de librerias
import express from "express";
import path from "path";
import shopController from "../controllers/shopController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

//creo variables
const router = express.Router();
const root = path.resolve();

//---------metodos get------------

//shop
router.get("/", asyncHandler(shopController.getShop));

// shop/item/:id
router.get("/item/:product_id", asyncHandler(shopController.getShopItemId));

// /shop/cart
router.get("/cart", asyncHandler(shopController.getShopCart));
// /shop/cart

//---------metodos post-------------------

// /shop/cart
router.post("/cart", asyncHandler(shopController.postShopCart));

// /shop/item/:id/add
router.post("/addItem/:product_id", asyncHandler(shopController.postShopItemIdAdd));

router.post("/delItem/:cart_id", asyncHandler(shopController.delShopItemId))


// ---------export-----------------

export default router;
