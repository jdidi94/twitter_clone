const Comment = require("../models/comments.js")


exports.createComment = async function (req, res) {
    try {
      const createComment =await Comment.create({
        userPhoto: req.body.userPhoto,
        userName: req.body.userName,
        post: req.body.post,
        user: req.body.user,
        comment: req.body.comment,
        photoComment:req.body.photoComment
      });


      res.send(createComment);
    } catch (err) {
      console.log(err);
    }
  };
