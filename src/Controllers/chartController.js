const axios = require('axios')
const {AV_API_KEY} = require('../config')

exports.getChartData = (req, res, next) => {
    res.send('Chart Data: Success!!!')
}

exports.GetSMAData = (req, res, next) => {
    res.send('SMA Data: Success!!!')
}

exports.GetEMAData = (req, res, next) => {
    res.send('EMA Data: Success!!!')
} 