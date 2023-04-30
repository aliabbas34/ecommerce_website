const User= require('../models/user');
const {check, validationResult}=require('express-validator');
var jwt=require('jsonwebtoken');
var { expressjwt: expressJwt } = require("express-jwt");

exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"user signed out succesfully",
    });
};

exports.signup=(req,res)=>{
    
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }


    const user=new User(req.body);

    //SAVING USER IN DATA BASE
    user.save().then((savedUser)=>{
        res.json(savedUser);
    }).catch((err)=>{
        //console.log(err);
        return res.status(400).json({
            err:"NOT able to save user in DB"
        })
    });
    
};

exports.signin=(req,res)=>{

    const errors=validationResult(req);

    const {email, password}=req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "USER email does not exist"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        //create token
        const token=jwt.sign({_id:user._id}, process.env.SECRET);

        //put token in cookie
        res.cookie("token",token,{expire: new Date()+9999});

        //send response to frontend
        const {_id,name,roles,email} = user;
        return res.json({token,user:{_id,name,roles,email}});

    });
};

//protected routes
exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
});

//custom middlewares

exports.isAuthenticated=(req,res,next)=>{
    let checker=req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

exports.isAdmin=(req,res,next)=>{
    if(req.profile.roles===0){
        return res.status(403).json({
            error: "you are not admin, access denied"
        });
    }
    next();
};
