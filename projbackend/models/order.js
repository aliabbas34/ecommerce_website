const mongoose=require('mogoose');

const{ObjectId}=mongoose.Schema;

const productCartSchema=new mongoose.Schema({
    products:{
        type: ObejectId,
        ref: "Product",
    },
    name:String,
    count: Number,
    size:Number,
    price:Number,
    }
);
const productCart=mongoose.model("ProductCart",productCartSchema);
const orderSchema=new mongoose.Schema({
    products:[productCartSchema],
    transactionId: {},
    amount: {type:Number},
    address: String,
    updated: Date,
    user:{
        type:ObjectId,
        ref: "User",
    },
},
{timeStamps:true}
);

const order=mongoose.model("Order",orderSchema);

module.exports={order,productCart};