const router = require("express").Router();
const postController = require("../controllers/post-controllers");

router.post("/", postController.createPosts);
router.get("/", postController.getAllPosts);
router.get("/user/follower/:id", postController.getAllPostsFollower); 
router.get("/user/:id", postController.getOneUserPosts);
router.get("/bookmarks/:id", postController.savedPosts);


router.patch("/:id", postController.updateComment);
router.patch("/likes/:id", postController.updateLikes);
router.patch("/saved/:id", postController.updateSaved);
router.patch("/retweet/:id", postController.updateRetweets);

module.exports = router;
