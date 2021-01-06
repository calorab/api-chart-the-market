const express = require('express')
const router = express.Router()

const chartController = require('../Controllers/chartController')


// GET /chartData
router.get('/chartdata', chartController.getChartData)

// GET /sma (Simple Moving Average endpoint)
router.get('/sma', chartController.GetSMAData)

// GET /ema (Exponential Moving Average endpoint)
router.get('/ema', chartController.GetEMAData)

module.exports = router