const axios = require('axios');
const {AV_API_KEY, AV_API_URL_BASE} = require('../config');

exports.getChartData = (req, res, next) => {
    let stockSymbol = req.query.symbol
    let interval = "function=TIME_SERIES_DAILY_ADJUSTED";
    if (req.query.interval === 'weekly') {
        interval = 'function=TIME_SERIES_WEEKLY_ADJUSTED'
    }
    axios.get(AV_API_URL_BASE + interval + '&symbol=' + stockSymbol + '&apikey=' + AV_API_KEY )
        .then(response => {
            res.json(response.data );
        })
        .catch(err => {
            console.log('THE ERROR: ', err)
            next();
        })
    
}