const campService=require("../services/camp.services");

module.exports.createCamp=async(req,res)=>{
    const {title,price,description,location,image}=req.body;
    const campground=await campService.createCamp(title,price,description,location,image);
    res.redirect(`campgrounds/${campground._id}`);
}

module.exports.allCamps=async(req,res)=>{
    const campgrounds=await campService.findAllCampgrounds();
    res.render("campgrounds/index",{campgrounds});
}

module.exports.getCamp=async(req,res)=>{
    const{id}=req.params;
    const campground=await campService.getCamp(id);
    res.render("campgrounds/show",{campground});
}

module.exports.newCamp=(req,res)=>{
    res.render('campgrounds/new');
}

module.exports.getEditCamp=async(req,res)=>{
    const{id}=req.params;
    const campground=await campService.getCamp(id);
    res.render("campgrounds/edit",{campground});
}

module.exports.editCamp=async(req,res)=>{
    const{title,price,location,image,description}=req.body;
    const{id}=req.params;
    const campground=await campService.editCamp(id,title,price,location,image,description);
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCamp=async(req,res)=>{
    const{id}=req.params;
    await campService.deleteCamp(id);
    res.redirect("/campgrounds");
}