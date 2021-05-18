const mongoose = require("mongoose");



const  postSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
}],
    
       
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
    likes:{
        type:Number,
    },
    retweets:{
        type:Number,
    },
    saved:{
        type:Number,
    },
    date: {
        type: Date, default:Date.now
    },


},{ timestamps: true });
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
// comments: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Comments'
// }],