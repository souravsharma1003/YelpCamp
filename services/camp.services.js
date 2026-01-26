const campModel=require("../models/campground.model");

module.exports.createCamp=async(title,price,description,location,image)=>{
        const newCamp=await campModel.create({
            title,
            price,
            description,
            location,
            image
        })
        return newCamp;
    }

module.exports.findAllCampgrounds=async()=>{
    return await campModel.find({});
}

module.exports.getCamp=async(id)=>{
    return await campModel.findById(id).populate("reviews");
}

module.exports.editCamp=async(id,title,price,location,image,description)=>{
    const campground=await campModel.findByIdAndUpdate(id,{title,price,location,image,description},{new:true});
    return campground;
}

module.exports.deleteCamp=async(id)=>{
    return await campModel.findByIdAndDelete(id);
}