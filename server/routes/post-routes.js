const router = require("express").Router();
const postController = require("../controllers/post-controllers");

router.post("/", postController.createPosts);
router.get("/", postController.getAllPosts);
router.patch("/:id", postController.updateComment);
router.patch("/likes/:id", postController.updateLikes);
router.patch("/saved/:id", postController.updateSaved);
router.patch("/retweet/:id", postController.updateRetweets);

module.exports = router;
