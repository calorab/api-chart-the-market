// const axios = require('axios')
// const {AV_API_KEY} = require('../config')
// exports.getChartData = (req, res, next) => {
//     res.send('Chart Data: Success!!!')
// }

// exports.getStockSymbol = (req, res, next) => {
//     let keyword = req.query.keyword
//     console.log('     request: ', req.query, keyword)
//     // if (!symbol) {
//     //     throw new Error('No symbol requested')
//     // }
//     // res.send('Stock Symbol: Success!!!')
//     axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keyword + '&apikey=' + AV_API_KEY)
//         .then(response => {
//             console.log('THE RESPONSE!!!!   ', response.data)
//             res.send(response.data)
//         })
//         .catch(err => {
//             console.log('THE ERROR: ', err)
//         })
// }