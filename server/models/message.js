const mongoose = require("mongoose");
const User = require("../models/user.js");


const  MessageSchema = new mongoose.Schema({
    send: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',

    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date, default:Date.now
    },


},{ timestamps: true });
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;