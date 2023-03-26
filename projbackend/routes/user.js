const express=require("express");
const router=express.Router();

const {getUserById,getUser,/*assignment code->*/getAllUsers}= require("../controllers/user");
const {isAdmin,isAuthenticated,isSignedIn}= require("../controllers/auth");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn, isAuthenticated, getUser);

//assignment code
router.get("/users",getAllUsers);
//assignment code

module.exports=router;
