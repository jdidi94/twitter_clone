const Post = require("../models/post.js");

exports.createPosts= async function  (req, res)  {
    try{
        const createPost= new Post({
        user:req.body.user,
        post:req.body.post,
        photo:req.body.photo,

        })
    const post=await createPost.save()
    res.send("created")

    }catch(err){
        console.log(err)
    }
}