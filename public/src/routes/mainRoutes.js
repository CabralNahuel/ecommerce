//importacion de librerias
import express from 'express'
import path from 'path'

//creo variables
const router = express.Router()
const root = path.resolve()

const mainController = require('../controllers/mainController.js')


//metodos get

//home
router.get('/home',mainController.home);


//contact
router.get('/contact',mainController.contact);


//about
router.get('/about',mainController.about);


//faqs
router.get('/faqs',mainController.faqs);

//--------export-------------
module.exports = router;