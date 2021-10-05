const axios = require('axios');
const {AV_API_KEY, AV_API_URL_BASE} = require('../config');
const dateMapping = require('./dataMapping');

module.exports = array => {
    let recentArray = [];
    array.map(element => {
        axios.get(AV_API_URL_BASE + 'function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + element.equity + '&apikey=' + AV_API_KEY )
            .then(response => {
                let timeSeries = response.data['Time Series (Daily)']
                return dateMapping(timeSeries);
            })
            .then(data => {
                recentArray.push(data[data.length-1]);
                console.log('BLAH: ', recentArray)
                return recentArray;
            })
            .catch(err => {
                console.log('THE ERROR: ', err)
                next();
            })
    })
};