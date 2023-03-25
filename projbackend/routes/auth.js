var express=require('express');
var router=express.Router();
const {signout,signup,signin,isSignedIn}=require('../controllers/auth');
const {check, validationResult} = require('express-validator');
router.get("/signout",signout);


router.post("/signup",
//express validator below
    check('name')
    .isLength({min:5})
    .withMessage('name must be at least 5 chars long'),
    check('email')
    .isEmail()
    .withMessage('email is required'),
    check('password')
    .isLength({min:3})
    .withMessage('password should be at least 3 chars long'),
signup);

router.post("/signin",
    check('email')
    .isEmail()
    .withMessage('email is required'),
    check('password')
    .isLength({min:1})
    .withMessage('password field is required'),
signin);

router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(req.auth);
});

module.exports=router;
