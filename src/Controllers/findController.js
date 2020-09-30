const axios = require('axios')

exports.getChartData = (req, res, next) => {

}

exports.getStockSymbol = (req, res, next) => {
    let symbol = req.params.symbol
    if (!symbol) {
        throw new Error('No symbol requested')
    }
    return 'Stock Symbol: Success'
    // axios.get('',)
}