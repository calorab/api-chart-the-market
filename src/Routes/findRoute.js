const express = require('express')
const router = express.Router()

const findController = require('../Controllers/findController')

// GET /chartData
router.get('/chartData', findController.getChartData)

//GET /stockSymbol
router.get('/stockSymbol', findController.getStockSymbol)
module.exports = router