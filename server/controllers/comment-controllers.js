const Comment = require("../models/comments.js");

exports.createComment = async function (req, res) {
  try {
    const createComment = await Comment.create({
      userPhoto: req.body.userPhoto,
      userName: req.body.userName,
      post: req.body.post,
      user: req.body.user,
      comment: req.body.comment,
      photoComment: req.body.photoComment,
    });

    res.send(createComment);
  } catch (err) {
    console.log(err);
  }
};
exports.updateLikes = async function (req, res) {
  try {
    if (req.body.message === true) {
      const likes = await Comment.updateOne(
        { _id: req.params.id },
        { $addToSet: { Commentslikes: req.body.likes }}

      );
      res.send("your likes comments are increased");
    } else {
      const likes = await Comment.updateOne(
        { _id: req.params.id },
        { $pull: { Commentslikes: req.body.likes }
         }
      );
      res.send("it's removed");
    }
  } catch (err) {
    console.log(err);
  }
};
