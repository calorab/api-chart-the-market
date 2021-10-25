const express = require('express')
const router = express.Router()

const saleController = require('../Controllers/saleController')


//POST /sale/ for sales
router.post('/', saleController.postSale)


module.exports = router