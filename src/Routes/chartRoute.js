const express = require('express')
const router = express.Router()

const chartController = require('../Controllers/chartController')


// GET /chartData
router.get('/', chartController.getChartData)

// GET /sma (Simple Moving Average endpoint)
router.get('/sma', chartController.GetSMAData)

// GET /ema (Exponential Moving Average endpoint)
router.get('/ema', chartController.GetEMAData)

// GET /macd (Moving Average Convergence/Divergence endpoint)
router.get('/macd', chartController.GetMACDData)
 
module.exports = router