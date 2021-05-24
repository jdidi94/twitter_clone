const mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
        Commentslikes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
      userPhoto:{
          type:String
      },
      userName:{
         type:String
      },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
     comment: {
        type: String
    },
    photoComment:{
        type: String
        
    }

 
}, { timestamps: true });

const Comment = mongoose.model('Comments', CommentSchema);
module.exports=Comment;