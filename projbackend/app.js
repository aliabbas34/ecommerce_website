require('dotenv').config();

const mongoose = require('mongoose');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors= require('cors');

//my routes
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const orderRoutes=require('./routes/order');



//DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=>{
    console.log("DB CONNECTED");
});

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);


//PORT
const port=process.env.PORT||8000;

//starting a SERVER
app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})