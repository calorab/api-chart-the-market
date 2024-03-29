const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        investments: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Investment'
            }
        ],
        sales: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Sale'
            }
        ]
    }
);

module.exports = mongoose.model('User', userSchema);