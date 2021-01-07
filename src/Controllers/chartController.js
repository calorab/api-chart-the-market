const axios = require('axios')
const {AV_API_KEY, AV_API_URL_BASE} = require('../config')

exports.getChartData = (req, res, next) => {
    let stockSymbol = req.query.symbol
    console.log('params: ', stockSymbol)
    axios.get(AV_API_URL_BASE + 'function=TIME_SERIES_DAILY_ADJUSTED' + '&symbol=' + stockSymbol + '&apikey=' + AV_API_KEY )
        .then(response => {
            res.send(response.data)
        })
        .catch(err => {
            console.log('THE ERROR: ', err)
            next();
        })
    
}

exports.GetSMAData = (req, res, next) => {
    // let stockSymbol = req.query.symbol
    // let interval = req.query.interval
    // console.log('params: ', stockSymbol)
    // axios.get(AV_API_URL_BASE + 'function=SMA' + '&symbol=' + stockSymbol + '&interval=' + interval + '&apikey=' + AV_API_KEY )
    //     .then(response => {
    //         console.log('Response in CD: ', response.data)
    //         res.send(response.data)
    //     })
    //     .catch(err => {
    //         console.log('THE ERROR: ', err)
    //         next();
    //     })
    // res.send('SMA Data: Success!!!')
}

exports.GetEMAData = (req, res, next) => {
    res.send('EMA Data: Success!!!')
} 