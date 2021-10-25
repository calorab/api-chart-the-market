const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = new Schema(
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
            type: String,
            required: true
        },
        buyPrice: {
            type: Number,
            required: true
        },
        sellPrice: {
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
  
module.exports = mongoose.model('Sale', saleSchema);