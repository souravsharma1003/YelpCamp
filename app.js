const express=require("express");
const path=require("path")
const app=express();
const campRouter=require("./routes/campground.routes");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/ExpressError.util");
const reviewRouter=require("./routes/review.route");
const session=require("express-session");
const sessionOption=require("./config/sessionOptions");
const flash=require("connect-flash");

app.use(session(sessionOption));
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
app.use(flash());

app.get("/",(req,res)=>{
    res.render("home");
})

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

app.use("/campgrounds/:id/reviews",reviewRouter);
app.use("/campgrounds",campRouter);

app.use((req,res,next)=>{
    return next(new ExpressError("Page not found",404));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message =statusCode === 500 ? "Internal Server Error" : err.message;
    res.status(statusCode).render("error",{error:err});
});

module.exports=app;