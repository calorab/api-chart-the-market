const axios = require('axios');
const Investment = require('../Models/investment')
const User = require('../Models/user')
const {AV_API_KEY, AV_API_URL_BASE} = require('../config');
const dataMapping = require('../Middleware/dataMapping')


exports.getInvestmentData = (req, res) => {
    console.log('req.body object: ', req.body);
    const userId = req.body.userId;
    Investment
        .find({user: userId})
        .then(investmentData => {
            console.log('investments array: ', investmentData);
            res.json(investmentData);
        })
        .catch(err => {
            console.log(err);
            next(err);
        });

}

exports.postInvestment = (req, res, next) => {
    console.log('date: ', req.body.date)

    let symbolUppercase = req.body.symbol.toUpperCase();

    const investment = new Investment({
        equity: symbolUppercase,
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
    console.log('inside deleteInvestments controller!');
    let investmentId = req.body.investmentId;
    let userId = req.body.userId;
    Investment
        .findById(investmentId)
        .then(investment => {
            if (investment.user.toString() !== userId) 
            {
                throw new Error('Not authorized!');
            }
            return Investment.findByIdAndRemove(investmentId);
        })
        .then(result => {
            return User.findById(userId);
        })
        .then(user => {
            user.investments.pull(investmentId);
            return user.save();
        })
        .then(result => {
            res.status(200).json(
                {
                    message: 'Your investment has been sold!',
                    newUserDetails: result
                }
            ); 
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
}

exports.salePrice = (req, res, next) => {
    console.log('Inside salePrice endpoint ', req.body.symbol);
    let stockSymbol = req.body.symbol
    axios.get(AV_API_URL_BASE + 'function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + stockSymbol + '&apikey=' + AV_API_KEY )
        .then(response => {
            console.log("salePrice logs1 : ", response.data)
            let mappedData = dataMapping(response.data['Time Series (Daily)'])
            let lastClose = mappedData[mappedData.length-1]
            // console.log("salePrice logs2 : ", lastClose, mappedData)
            return lastClose;
        }).then(closeData => {
            res.json(closeData);
        })
        .catch(err => {
            console.log('THE ERROR: ', err)
            next();
        })
}