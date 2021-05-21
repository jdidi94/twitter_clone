const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
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
    cover:String
 
});



const User = mongoose.model('User', UserSchema);
module.exports=User;

