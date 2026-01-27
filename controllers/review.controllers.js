const {getCamp}=require("../services/camp.services");
const ExpressError=require("../utils/ExpressError.util");
const wrapAsync=require("../utils/wrapAsync.util");
const reviewService=require("../services/review.services");

module.exports.createReview=wrapAsync(async(req,res)=>{
    const{id}=req.params;
    const{rating,review}=req.body;
    const camp=await getCamp(id);
    if(!camp){
        throw new ExpressError("Camp not found",400);
    }
    const reviews=await reviewService.createReviewService(rating,review);
    camp.reviews.push(reviews);
    await camp.save();
    req.flash("success","Created a new Review");
    res.redirect(`/campgrounds/${camp._id}`);
})

module.exports.deleteReview=wrapAsync(async(req,res)=>{
    const{id,reviewId}=req.params;
    const camp=await reviewService.deleteReviewService(id,reviewId);
    if(!camp){
        throw new ExpressError("Camp not found",404);
    }
    req.flash("success","Successfully deleted review");
    res.redirect(`/campgrounds/${camp._id}`)
})