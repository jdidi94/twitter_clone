const Comment = require("../models/comments.js")


exports.createComment = async function (req, res) {
    try {
      const createComment = new Comment({
        userPhoto: req.body.userPhoto,
        userName: req.body.userName,
        post: req.body.post,
        user: req.body.user,
        comment: req.body.comment,
      });

      const comment = await createComment.save();
      res.send(comment);
    } catch (err) {
      console.log(err);
    }
  };
