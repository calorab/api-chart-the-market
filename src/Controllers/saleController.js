const Sale = require('../Models/sales')
const User = require('../Models/user')
const returnsMapping = require('../Middleware/returnsMapping.js')

exports.postSale = (req, res, next) => {
    console.log('req.body postSales: ', req.body)

    let symbolUppercase = req.body.symbol.toUpperCase();

    const sale = new Sale({
        equity: symbolUppercase,
        lots: req.body.lots,
        date: req.body.date,
        buyPrice: req.body.buyPrice,
        sellPrice: req.body.sellPrice,
        user: req.body.userId,
    });

    sale
        .save()
        .then(result => {
            return User.findById(req.body.userId)
        }).then(user => {
            user.sales.push(sale);
            return user.save();
        })
        .then(result => { 
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });

}

exports.getSales = (req, res, next) => {
    console.log('req.body object getSales: ', req.body);
    const userId = req.body.userId;

    Sale
        .find({user: userId})
        .then(saleData => {
            let chartReturns = returnsMapping(saleData)
            res.json({saleData, chartReturns});
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
}