const User=require('../models/user');
const Order=require('../models/order');

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"No user was found in DB"
            });
        }
        req.profile=user;
        next();
    });
};

exports.getUser=(req,res)=>{
    req.profile.salt=undefined;
    req.profile.encryPassword=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile);
};

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new: true, useFindAndModify: false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"you're not authorized to update user in the DB"
                });
            }
            user.salt=undefined;
            user.encryPassword=undefined;
            user.createdAt=undefined;
            user.updatedAt=undefined;
            res.json(user);
        }
    )
}

exports.userPurchaseList=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order in this account"
            });
        }
        res.json(order);
    })
}

exports.pushOrderInPurchaseList=(req,res,next)=>{
    let purchases=[];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transactionId: req.body.order.transactionId
        })
    });
    //store this in DB
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push: {purchases:purchases}},
        {new:true},
        (err,purchases)=>{
            if(err){
                return res.status(400).json({
                    error:"Unable to save purchase list"
                })
            }
            next();
        }
    )
    
}