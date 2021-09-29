const express = require('express')
const router = express.Router()

const chartController = require('../Controllers/chartController');

// GET /chartData
router.get('/', chartController.getChartData)
 
module.exports = router