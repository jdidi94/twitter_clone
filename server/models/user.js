const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
        
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    name: String,
    bio: String,
    phone: Number,
    email: String,
    password: String,
    photo: String,
 
});



const User = mongoose.model('User', UserSchema);
module.exports=User;

