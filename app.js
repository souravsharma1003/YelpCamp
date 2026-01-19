const express=require("express");
const path=require("path")
const app=express();
const campRouter=require("./routes/campground.routes");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.render("home");
})

app.use("/campgrounds",campRouter);

app.use((req,res)=>{
    res.status(404).send("NOT FOUND");
});  

module.exports=app;