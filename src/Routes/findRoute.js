const express = require('express')
const router = express.Router()

const findController = require('../Controllers/findController')


//GET /stockSymbol
router.get('/stockSymbol', findController.getStockSymbol)
module.exports = router

// GET /chartData
router.get('/investmentData', findController.getInvestmentData)