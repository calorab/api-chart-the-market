const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investmentSchema = new Schema(
    {
        equity:{
            type: String,
            required: true
        },
        lots: {
            type: Number,
            required: false
        },
        date: {
            type: Date,
            required: true
        },
        buyPrice: {
            type: Number,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }
    
);
  
module.exports = mongoose.model('Investment', investmentSchema);