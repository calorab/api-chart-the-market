const express = require('express')
const router = express.Router()

const symbolController = require('../Controllers/symbolController')


//GET /stockSymbol
router.get('/stocksymbol', symbolController.getStockSymbol)


module.exports = router