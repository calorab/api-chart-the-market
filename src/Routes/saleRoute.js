const express = require('express')
const router = express.Router()

const saleController = require('../Controllers/saleController')


//POST /sale/ for sales
router.post('/', saleController.postSale)

//GET /sale/all for all sales for front end calcs
router.post('/all', saleController.getSales)

module.exports = router