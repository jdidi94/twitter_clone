
const router = require("express").Router();
const commentController= require("../controllers/comment-controllers")

router.post("/", commentController.createComment);
// router.get("/", postController.getAllPosts)
module.exports = router;
