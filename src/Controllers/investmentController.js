const axios = require('axios');
const Investment = require('../Models/investment')
const User = require('../Models/user')

exports.getInvestmentData = (req, res) => {
    console.log('req.body object: ', req.body);
    const userId = req.userId;
    Investment
        .find({user: userId})
        .then(result => {
            res.status(200).json(result);
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