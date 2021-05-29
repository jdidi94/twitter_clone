const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const config = require("../models/config");

exports.hello=async function  (req, res){
  res.send("hello")
}


exports.signUp= async function (req, res)  {
    // console.log("hello")
      try {
   
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const token = jwt.sign({ email: req.body.email }, config.secret, {
        expiresIn: "4h",
      });
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      const t=  await user.save()
      // console.log( 'hellllllllllllllllllllllllllllll',t)
      if (t) {
        res.send({
          user: t,
          message: "congrats",
          auth: true,
          token: token,
        });
      } else {
        res.send({
          message: "theres a problem with registration ",
          auth: false,
          token: null,
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

 exports.login= async  function  (req, res)  {
   console.log(req.body)
    try {
      var { email, password } = req.body;
      const user = await User.findOne( { email: email });
      if(user){
          var result=bcrypt.compareSync(password, user.password)
          if(result){
              var token=jwt.sign({email:email},config.secret,{expiresIn:"4h"},)
              res.send({message:"success",auth:true,token:token})
          }else{
              res.send({message:"wrong password",auth:false,token:token} )
          }
      } else {
          res.send({message:"user not found",auth:false,token:null })
      }
    } catch (err) {
      res.send(err);
    }
  }
exports.getUserInfo=async function  (req, res)  {
  try{
    const populate = await User.findOne(
      {_id:req.params.id}
    ).populate("followers").populate("following").exec();
    const user = await User.findOne(
      {_id:req.params.id}
    )
    res.send({user:user,populate:populate})
  }catch (err) {
    console.log(err)
  }
}
exports.getUser= async function  (req, res)  {

    try {
      const token = req.headers.authorization.split(" ")[1];
      const email = await jwt.verify(token, config.secret);
      console.log(email)
      if(email){

        const user = await User.findOne(
          { email: email.email }
        ).populate("followers")
        .exec();

        res.send(user);
      }else{
        res.send("user not found")
      }
    } catch (err) {
      res.send(err);
    }
 
}
exports.useredit = async function  (req, res)  {
  console.log(req.body)
  try{
     if(req.body.password!==""){
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const user = await User.findByIdAndUpdate(
        { _id: req.params.id }, {$set: { 
          name: req.body.name,
          bio:req.body.bio,
          phone:req.body.phone,
          email: req.body.email,
          password:hash, 
          photo:req.body.photo,
          cover:req.body.cover,
     
         }})
        res.send({message:"the password updated with data"})
     }
     else{
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },{$set:{ 
          name: req.body.name,
          bio:req.body.bio,
          phone:req.body.phone,
          email: req.body.email,
          photo:req.body.photo,

        }}) 
        res.send({ user:"updated"})
     }
  }catch(err){
    res.send(err)
  }
}
exports.updateFollowing= async function  (req, res)  {
  try{
    if(req.body.message===true){

      const user = await User.updateOne(
        { _id: req.params.id },
        { $addToSet: { following: req.body.following }}
      );
      res.send("you are following this user");
    }else if (req.body.message===false){
      const user = await User.updateOne(
        { _id: req.params.id },
        { $pull: { following: req.body.following } }
      );
      res.send("you are not following this user");
    }
  }catch(err){
    console.error(err)
  }

}
exports.updateFollowers= async function  (req, res)  {
 
  try{
    if(req.body.message===true){

      const user = await User.updateOne(
        { _id: req.params.id },
        { $addToSet: { followers: req.body.followers },
      $inc:{"followersNumber":1} }
      );
      res.send("you are following this user");
    }else{
      const user = await User.updateOne(
        { _id:req.params.id },
        { $pull: { followers: req.body.followers } ,
        $inc:{"followersNumber":-1} }
      );
      res.send("you are not folllowing this user");
    }
  }catch(err){
    console.error(err)
  }

}
exports.updateLikes = async function (req, res) {
  try {
    if(req.body.message===true){

      const likes = await User.updateOne(
        { _id: req.params.id },
        { $addToSet: { likes: req.body.likes }}
      );
      res.send("your likes are increased");
    }else{
      const likes = await User.updateOne(
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

      const saved = await User.updateOne(
        { _id: req.params.id },
        { $addToSet: { saved: req.body.saved } }
      );
      res.send("your saved are increased");
    }else{
      
      const saved = await User.updateOne(
        { _id: req.params.id },
        { $pull: { saved: req.body.saved } }
      );
      res.send("your saved are increased");
    }
  } catch (err) {
    console.log(err);
  }
};
exports.allUsers=async function  (req, res)  {
  try {
    const user = await User.find({}).sort({ followersNumber: -1 })
 

    res.send(user);
  } catch (err) {
    console.log(err);
  }
}
