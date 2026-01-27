require("dotenv").config();

module.exports={
    secret:process.env.sessionSecret,
    saveUninitialized:false,
    resave:false,
    cookie:{
        expires:new Date(Date.now()+1000*60*60*24*7),
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }    
}