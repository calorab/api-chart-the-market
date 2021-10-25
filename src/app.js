require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');
const winston = require('winston');
const bodyParser = require('body-parser');

const symbolRoute = require('./Routes/symbolRoute');
const chartRoute = require('./Routes/chartRoute');
const investmentRoute = require('./Routes/investmentRoute');
const userRoute = require('./Routes/userRoute');
const saleRoute = require('./Routes/saleRoute')

const app =  express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'info.log' })
  ]
});

if (NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

//API - need for later development
// app.use(function validateBearerToken(req, res, next) {
//   const apiToken = process.env.API_TOKEN
//   const authToken = req.get('Authorization')

//   if (!authToken || authToken.split(' ')[1] !== apiToken) {
//     logger.error(`Unauthorized request to path: ${req.path}`);
//   }
//   next()
// })

app.use('/symbol', symbolRoute)
app.use('/chartdata', chartRoute)
app.use('/myinvestments', investmentRoute)
app.use('/user', userRoute)
app.use('/sale', saleRoute)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app 