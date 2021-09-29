const axios = require('axios');
const Investment = require('../Models/investment')
const User = require('../Models/user')

exports.getInvestmentData = (req, res) => {
    console.log("Got to getInvestmentData!!!") // check-a-roonie
    res.send('Your Data...');
}
// NEEDS TESTING
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
            user.investment.push(investment);
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