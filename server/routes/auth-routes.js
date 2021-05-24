
const router = require("express").Router();
const userController= require("../controllers/auth-controllers")

router.get("/hello", userController.hello);
router.get("/getUser/:id", userController.getUserInfo);


router.get("/", userController.getUser);
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.patch("/:id", userController.useredit);
router.patch("/following/:id", userController.updateFollowing);
router.patch("/followers/:id", userController.updateFollowers);
router.get("/users",userController.allUsers)
router.patch("/likes/:id", userController.updateLikes);
router.patch("/saved/:id", userController.updateSaved);

module.exports = router;