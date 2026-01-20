const campService=require("../services/camp.services");
const wrapAsync=require("../utils/wrapAsync.util");

module.exports.createCamp=wrapAsync(async(req,res)=>{
    const {title,price,description,location,image}=req.body;
    const campground=await campService.createCamp(title,price,description,location,image);
    res.redirect(`campgrounds/${campground._id}`);
})

module.exports.allCamps=wrapAsync(async(req,res)=>{
    const campgrounds=await campService.findAllCampgrounds();
    res.render("campgrounds/index",{campgrounds});
})

module.exports.getCamp=wrapAsync(async(req,res)=>{
    const{id}=req.params;
    const campground=await campService.getCamp(id);
    res.render("campgrounds/show",{campground});
})

module.exports.newCamp=(req,res)=>{
    res.render('campgrounds/new');
}

module.exports.getEditCamp=wrapAsync(async(req,res)=>{
    const{id}=req.params;
    const campground=await campService.getCamp(id);
    res.render("campgrounds/edit",{campground});
})

module.exports.editCamp=wrapAsync(async(req,res)=>{
    const{title,price,location,image,description}=req.body;
    const{id}=req.params;
    const campground=await campService.editCamp(id,title,price,location,image,description);
    res.redirect(`/campgrounds/${campground._id}`);
})

module.exports.deleteCamp=wrapAsync(async(req,res)=>{
    const{id}=req.params;
    await campService.deleteCamp(id);
    res.redirect("/campgrounds");
})