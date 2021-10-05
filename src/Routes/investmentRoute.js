const InvestmentController = require('../Controllers/investmentController')
const express = require('express')
const router = express.Router()

//GET all investment data @ /myinvestments
router.post('/', InvestmentController.getInvestmentData)

//POST an investment @ /myinvestments
router.post('/add', InvestmentController.postInvestment)

// DELETE (sell) an investment /myinvestments
router.delete('/sell', InvestmentController.deleteInvestment);

module.exports = router