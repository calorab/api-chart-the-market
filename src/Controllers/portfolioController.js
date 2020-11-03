const InvestmentServices = require('../Services/investment_services')

exports.getInvestments = (req, res, next) => {
    const knexInstance = req.app.get('db')
    InvestmentServices.getAllInvestments(knexInstance)
        .then(investments => {
            res.json(investments)
        })
        .catch(next)
}

exports.getInvestmentById = (req, res, next) => {
    const knexInstance = req.app.get('db') 
    InvestmentServices.getById(knexInstance, req.params.investment-id)
    .then(investment => {
        if (!investment) {
            return res.status(404).json({
                error: { message: `Investment doesn't exist` }
            })
        }
        res.json(investment)
    })
    .catch(next)
}

exports.postInvestment = (req, res, next) => {
    const knexInstance = req.app.get('db') 
    const { symbol, shares, buy_date, value_at_buy_date } = req.body
    const newInvestment = { symbol, shares, buy_date, value_at_buy_date }

    for (const [key, value] of Object.entries(newInvestment)) {
        if (value == null) {
            return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
            })
        }
    }

    InvestmentServices.insertInvestment(
        knexInstance,
        newInvestment
    )
    .then(investment => {
        res.status(201).json(investment)
    })
    .catch(next)
}

exports.deleteInvestments = (req, res, next) => {
    const knexInstance = req.app.get('db')
    InvestmentServices.deleteInvestment(
        knexInstance, 
        req.params.investment-id
    )
    .then(investment => {
        if (!investment) {
            return res.status(404).json({
                error: { message: `Investment doesn't exist` }
            })
        }
        res.status(204).end()
    })
    .catch(next)
}
