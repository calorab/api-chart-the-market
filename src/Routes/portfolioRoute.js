const express = require('express')
const router = express.Router()
const jsonParser = express.json()

const portfolioController = require('../Controllers/portfolioController')

// GET portfolio/investments
router.get('/investments', portfolioController.getInvestments)

router.get('/investment/:investment_id', portfolioController.getInvestmentById)

router.post('/investment', jsonParser, portfolioController.postInvestment)

router.delete('/deleteinvestment/:investment_id', portfolioController.deleteInvestments)

module.exports = router