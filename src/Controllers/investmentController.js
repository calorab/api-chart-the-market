const axios = require('axios');
const Investment = require('../Models/investment')
const User = require('../Models/user')
// const {AV_API_KEY, AV_API_URL_BASE} = require('../config');
// const getLatestPrice = require('../Middleware/getLatestPrice');

exports.getInvestmentData = (req, res) => {
    console.log('req.body object: ', req.body);
    const userId = req.body.userId;
    Investment
        .find({user: userId})
        .then(investmentData => {
            console.log('investment data1: ', investmentData);
            res.json(investmentData);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });

}

exports.postInvestment = (req, res, next) => {
    const investment = new Investment({
        equity: req.body.symbol,
        lots: req.body.lots,
        date: req.body.date,
        buyPrice: req.body.value,
        user: req.body.userId,
    });

    investment
        .save()
        .then(result => {
            return User.findById(req.body.userId)
        }).then(user => {
            console.log('The User: ', user)
            user.investments.push(investment);
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

exports.deleteInvestment = (req, res, next) => {
    console.log('inside deleteInvestments controiller!');
}