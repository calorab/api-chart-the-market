const InvestmentController = require('../Controllers/investmentController')
const express = require('express')
const router = express.Router()

//GET all investment data @ /myinvestments
router.get('/', InvestmentController.getInvestmentData)

//POST an investment @ /myinvestments
router.post('/add', InvestmentController.postInvestment)

module.exports = router