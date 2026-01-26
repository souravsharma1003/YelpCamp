const express=require("express");
const path=require("path")
const app=express();
const campRouter=require("./routes/campground.routes");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/ExpressError.util");
const reviewRouter=require("./routes/review.route");

app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.render("home");
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