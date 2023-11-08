//importacion de librerias
import express from 'express'
import path from 'path'

//creo variables
const router = express.Router()
const root = path.resolve()

const shopController = require('../controllers/shopController.js')

//---------metodos get------------

//shop
router.get('/shop',shopController.getShop)


// shop/item/:id
router.get('/shop/item/:id',shopController.getShopItemId)

// /shop/cart
router.get('/cart',shopController.getShopCart)


//---------metodos post-------------------

// /shop/cart
router.post('/cart',shopController.postShopCart)


// /shop/item/:id/add
router.post('/shop/item/:id/add',shopController.postShopItemIdAdd)



// ---------export-----------------

module.exports = router;