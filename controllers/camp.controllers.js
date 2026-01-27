const campService = require("../services/camp.services");
const wrapAsync = require("../utils/wrapAsync.util");

module.exports.createCamp = wrapAsync(async (req, res) => {
    const { title, price, description, location, image } = req.body;
    const campground = await campService.createCamp(
        title,
        price,
        description,
        location,
        image
    );
    req.flash("success","Successfully created a new CamGround!");
    res.redirect(`/campgrounds/${campground._id}`);
});

module.exports.allCamps = wrapAsync(async (req, res) => {
    const campgrounds = await campService.findAllCampgrounds();
    res.render("campgrounds/index", { campgrounds });
});

module.exports.getCamp = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await campService.getCamp(id);
    if (!campground){
        req.flash("error","Error finding the Campground!")
        return res.redirect("/campgrounds");
    } 
    res.render("campgrounds/show", { campground });
});

module.exports.newCamp = (req, res) => {
    res.render("campgrounds/new");
};

module.exports.getEditCamp = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await campService.getCamp(id);
    if (!campground){
        req.flash("error","Error finding the Campground!")
        return res.redirect("/campgrounds");
    }    
    res.render("campgrounds/edit", { campground });
});

module.exports.editCamp = wrapAsync(async (req, res) => {
    const { title, price, location, image, description } = req.body;
    const { id } = req.params;
    const campground = await campService.editCamp(
        id,
        title,
        price,
        location,
        image,
        description
    );
    if (!campground){
        req.flash("error","Error finding the Campground!")
        return res.redirect("/campgrounds");
    } 
    req.flash("success","Successfully edited the Campground");
    res.redirect(`/campgrounds/${campground._id}`);
});

module.exports.deleteCamp = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await campService.deleteCamp(id);
    if (!campground){
        req.flash("error","Error finding the Campground!")
        return res.redirect("/campgrounds");
    } 
    req.flash("success","Successfully deleted Campground")
    res.redirect("/campgrounds");
});
 