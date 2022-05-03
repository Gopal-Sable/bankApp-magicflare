const mongoose = require('mongoose');
const { Schema } = mongoose;
const TransSchema = new Schema({
    senderAcc: {
        type: Number,
        required: true,
        default:mongoose.Schema.Types.Acc
    },
    receiverAcc: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required:true
    },
    date: {
        type: Date,
        default: Date()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});
module.exports = mongoose.model("trans", TransSchema)