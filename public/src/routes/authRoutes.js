//importacion de librerias
import express from 'express'
import path from 'path'

//creo variables
const router = express.Router()
const root = path.resolve()

const authController = require('../controllers/authController.js')


//---------metodos get------------

// auth/login
router.get('auth/login',authController.getAuthLogin)


// auth/logout
router.get('/auth/login',authController.getAuthLogout)

// /auth/register
router.get('/auth/register',authController.getAuthRegister)


//---------metodos post-------------------

// auth/login
router.post('auth/login',authController.postAuthLogin)

// /auth/register
router.post('/auth/register',authController.postAuthRegister)

// ---------export-----------------

module.exports = router;