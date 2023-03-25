const express= require("express");
const app= express();
const port=3000;
app.get('/',(req,res)=>{
    return res.send("hello there");
});

app.get('/login',(req,res)=>{
    return res.send("you reached the login page");
});



const isLogged=(req,res,next)=>{
    console.log("is logged in");
    next();
};
const isAdmin=(req,res,next)=>{
    console.log("is admin");
    next();
};

const requestTime=(req,res,next)=>{
    req.requestTime=Date.now();
    next();
};
app.use(requestTime);

const admin=(req,res)=>{
    let responseText="admin logged at";
    responseText+=` ${req.requestTime}`;
    return res.send(responseText);
};

app.get('/admin',isLogged,isAdmin,requestTime,admin);

app.get('/signup',(req,res)=>{
    return res.send("Hello there, you reached the signup page");
});

app.listen(port,()=>{
    console.log("server is running");
});
