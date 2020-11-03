const express = require('express')
const router = express.Router()
const jsonParser = express.json()

const portfolioController = require('../Controllers/portfolioController')

// GET portfolio/investments
router.get('/investments', portfolioController.getInvestments)

router.get('/investment/:investment-id', portfolioController.getInvestmentById)

router.post('/investment', jsonParser, portfolioController.postInvestment)

router.delete('/delete-investment/:investment-id', portfolioController.deleteInvestments)

module.exports = router