const mongoose=require("mongoose");
const review=require("./review.model");

const campgroundSchema=new mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    location:String,
    image:String,
    reviews:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"review"
        }
    ]
})

campgroundSchema.post("findOneAndDelete",async(doc)=>{
    if(doc){
        await review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})

const campgroundModel=mongoose.model("campground",campgroundSchema);

module.exports=campgroundModel;