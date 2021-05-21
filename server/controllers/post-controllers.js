const Post = require("../models/post.js");
const User = require("../models/user.js");

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
    const post = await Post.find({}).sort({createdAt:-1})
      .populate("user")
      .populate("comments")
      .exec();
    res.send(post);
  } catch (err) {
    console.log(err);
  }
};
exports.updateComment = async function (req, res) {
  console.log(req.body);
  try {
    const comment = await Post.updateOne(
      { _id: req.params.id },
      {
        $push: {
           comments: {
              $each: [req.body.comments],
              $position: 0
           }
        }
      }
    );
    res.send("updated post with commment");
  } catch (err) {
    console.log(err);
  }
};
exports.getOneUserPosts= async function (req, res) {
  try {
    const post = await Post.find({user:req.params.id}).sort({createdAt:-1})
      .populate("user")
      .populate("comments")
  
      .exec();
  
    res.send(post);
  } catch (err) {
    console.log(err);
  }
};
exports.updateComment = async function (req, res) {
  console.log(req.body);
  try {
    const comment = await Post.updateOne(
      { _id: req.params.id },
      {
        $push: {
           comments: {
              $each: [req.body.comments],
              $position: 0
           }
        }
      }
    );
    res.send("updated post with commment");
  } catch (err) {
    console.log(err);
  }
};
exports.updateLikes = async function (req, res) {
  try {
    if(req.body.message===true){

      const likes = await Post.updateOne(
        { _id: req.params.id },
        { $addToSet: { likes: req.body.likes }}
      );
      res.send("your likes are increased");
    }else{
      const likes = await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.body.likes } }
      );
      res.send("it's removed");
    }
  } catch (err) {
    console.log(err);
  }
};
exports.updateSaved = async function (req, res) {
  try {
    if(req.body.message===true){

      const saved = await Post.updateOne(
        { _id: req.params.id },
        { $addToSet: { saved: req.body.saved } }
      );
      res.send("your saved are increased");
    }else{
      
      const saved = await Post.updateOne(
        { _id: req.params.id },
        { $pull: { saved: req.body.saved } }
      );
      res.send("your saved are increased");
    }
  } catch (err) {
    console.log(err);
  }
};
exports.updateRetweets = async function (req, res) {
  try {


      const retweets = await Post.updateOne(
        { _id: req.params.id },
        { $push: { retweets: req.body.retweets } }
      );
      res.send("item is added");

      
    } catch (err) {
    console.log(err);
  
}
}
