const Post = require("../models/post.js");

exports.createPosts = async function (req, res) {
  try {
    const createPost = new Post({
      user: req.body.user,
      post: req.body.post,
      photo: req.body.photo,
      public: req.body.public,
    });
    const post = await createPost.save();
    res.send("created");
  } catch (err) {
    console.log(err);
  }
};

exports.getAllPosts = async function (req, res) {
  try {
    const post = await Post.find({})
      .populate("user")
      .populate("comments")
      .exec();
    res.send(post);
  } catch (err) {
    console.log(err);
  }
};
exports.updateComment= async function  (req, res)  {
  try{
    const comment =await Post.updateOne({_id: req.params.id},{$set:{
      comments:req.body.comments }})
      res.send("updated post with commment")
  }catch(err){
    console.log(err);
  }
}