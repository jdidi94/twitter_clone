const mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: {
        type: Number
    },
     comment: {
        type: String
    },
    photo: String,

 
}, { timestamps: true });

const Comment = mongoose.model('Comments', CommentSchema);
module.exports=Comment;