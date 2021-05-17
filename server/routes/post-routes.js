
const router = require("express").Router();
const postController= require("../controllers/post-controllers")

router.post("/", postController.createPosts);
module.exports = router;
