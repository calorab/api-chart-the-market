const axios = require('axios')
const {AV_API_KEY, AV_API_URL_BASE} = require('../config')

exports.getStockSymbol = (req, res, next) => {
    console.log(req.query)
    let keyword = req.query.keyword
    if (!keyword) {
        throw new Error('No symbol requested')
    }
    // res.send('Stock Symbol: Success!!!')
    axios.get( AV_API_URL_BASE + 'function=SYMBOL_SEARCH&keywords=' + keyword + '&apikey=' + AV_API_KEY)
        .then(response => {
            console.log(response.data)
            res.send(response.data)
        })
        .catch(err => {
            console.log('THE ERROR IS: ', err)
            next();
        })
}