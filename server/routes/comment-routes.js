
const router = require("express").Router();
const commentController= require("../controllers/comment-controllers")

router.post("/", commentController.createComment);
router.patch("/:id", commentController.updateLikes)
module.exports = router;
