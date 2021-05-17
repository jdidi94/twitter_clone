const mongoose = require("mongoose");



const  postSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
       
    post: {
        type: String,
        required: true
    },
    photo:{
       type: String,
       required: true
    },
    public:{
    type:Boolean,
    default:false,
    },
    likes:Number,
    retweets:Number,
    saved: Number,
    date: {
        type: Date, default:Date.now
    },


},{ timestamps: true });
const Post = mongoose.model('Post', postSchema);
module.exports = Post;