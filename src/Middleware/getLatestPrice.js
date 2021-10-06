// const axios = require('axios');
// const {AV_API_KEY, AV_API_URL_BASE} = require('../config');
// const dateMapping = require('./dataMapping');

// exports.getLatestPrice = array => {

//     array.map( async element => {
//          await axios.get(AV_API_URL_BASE + 'function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + element.equity + '&apikey=' + AV_API_KEY )
//             .then(response => {
//                 let timeSeries = response.data['Time Series (Daily)']
//                 return dateMapping(timeSeries);
//             })
//             .then(data => {
//                 priceArray.push(data[data.length-1]);
//                 console.log('BLAH: ', recentArray)
//                 // res.json(recentArray);
//             })
//             .catch(err => {
//                 console.log('THE ERROR: ', err)
//                 next();
//             })
//     })
//     return;
// };