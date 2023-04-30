const Product=require('../models/product');
const formidable=require("formidable");
const _ = require("lodash");
const fs=require("fs");

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found in DB"
            });
        }
        req.product=product;
        next();
    });
};

//create controller
exports.createProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            });
        }
        //destructure the fields
        const{name,description,price,category,stock}=fields;
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error:"please include all the fields"
            });
        }


        let product=new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size>3000000){ //greater than 2 mb
                return res.status(400).json({
                    error:"file size too big"
                });
            }
            product.photo.data= fs.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type;
        }
        //save to the DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"saving tshirt in DB failed"
                });
            }
            res.json(product);
        })
    })
};


//read controllers
exports.getProduct=(req,res)=>{
    req.product.photo=undefined;
    return res.json(req.product);
};

//middleware to read photo
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",res.product.photo.contentType);
        res.send(req.product.photo.data);
    }
    next();
};

//update controllers
exports.updateProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            });
        }


        

        //updation code
        let product=req.product;
        product=_.extend(product,fields);


        //destructure and entry check
        const{name,description,price,category,stock}=product;
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error:"please include all the fields"
            });
        }

        //handle file here
        if(file.photo){
            if(file.photo.size>3000000){ //greater than 2 mb
                return res.status(400).json({
                    error:"file size too big"
                });
            }
            product.photo.data= fs.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type;
        }
        //save to the DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"updation of product failed"
                });
            }
            res.json(product);
        })
    })
};

//delete controllers
exports.removeProduct=(req,res)=>{
    let product=req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete the Product"
            });
        }
        res.json({
            message:"Deletion was successfull",
            deletedProduct
        });
    })
};

//listing all products controller
exports.getAllProducts=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit):8;
    let sortBy=req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"NO product Found"
            });
        }
        res.json(products);
    })
};

exports.getAllUniqueCategories=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"No category found"
            });
        }
        res.json(category);
    });
};

exports.updateStock=(req,res,next)=>{
    let myOperation=req.body.order.products.map(prod=>{
        return {
            updateOne : {
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count, sold : +prod.count}}
            }
        }
    });
    Product.bulkWrite(myOperation,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk operation failed"
            });
        }
        next();
    });
};