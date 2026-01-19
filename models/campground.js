const mongoose=require("mongoose");

const campgroundSchema=new mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    location:String,
    image:String,
})

const campgroundModel=mongoose.model("campground",campgroundSchema);

module.exports=campgroundModel;