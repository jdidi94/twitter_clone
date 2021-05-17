
const router = require("express").Router();
const postController= require("../controllers/post-controllers")

router.post("/", postController.createPosts);
router.get("/", postController.getAllPosts)
router.patch("/:id", postController.updateComment)


module.exports = router;
