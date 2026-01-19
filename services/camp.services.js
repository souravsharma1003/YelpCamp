const campModel=require("../models/campground");

module.exports.createCamp=async(title,price,description,location,image)=>{
    try {
        const newCamp=await campModel.create({
            title,
            price,
            description,
            location,
            image
        })
        return newCamp;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.findAllCampgrounds=async()=>{
    return await campModel.find({});
}

module.exports.getCamp=async(id)=>{
    return await campModel.findById(id);
}

module.exports.editCamp=async(id,title,price,location,image,description)=>{
    const campground=await campModel.findByIdAndUpdate(id,{title,price,location,image,description},{new:true});
    return campground;
}

module.exports.deleteCamp=async(id)=>{
    await campModel.findByIdAndDelete(id);
}