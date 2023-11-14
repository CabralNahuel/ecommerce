//importacion de librerias
import express from 'express'
import path from 'path'

//creo variables
const router = express.Router()
const root = path.resolve()

const adminController = require('../controllers/adminController.js')

//---------metodos get------------

// admin
router.get('/admin',adminController.getAdmin)

// /admin/create
router.get('/admin/create',adminController.getAdminCreate)

// /admin/edit/:id
router.get('/admin/edit/:id',adminController.getAdminEditId)


//---------metodos post-------------------

// /admin/create
router.post('/admin/create',adminController.postAdminCreate)


//------------metodos put ----------------

// /admin/edit/:id
router.put('/admin/edit/:id',adminController.putAdminEditId)


//------------metodos delete--------------

// /admin/delete/:id
router.delete('/admin/delete/:id',adminController.deleteAdminDeleteId)

// ---------export-----------------

module.exports = router;