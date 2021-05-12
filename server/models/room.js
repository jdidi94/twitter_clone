const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var MsgThreadSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    group_name: {
        type: String
    },
     description: {
        type: String
    },

 
}, { timestamps: true });

const Room = mongoose.model('Room', MsgThreadSchema);
module.exports=Room;