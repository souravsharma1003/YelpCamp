const campgroundModel = require("../models/campground.model");
const reviewModel=require("../models/review.model");

module.exports.createReviewService=async(rating,review)=>{
    const reviews=await reviewModel.create({
        body:review,
        rating
    })
    return reviews;
}

module.exports.deleteReviewService = async (id, reviewId) => {
    const camp = await campgroundModel.findById(id);
    if (!camp) return null;

    camp.reviews = camp.reviews.filter(
        review => !review.equals(reviewId)
    );

    await reviewModel.findByIdAndDelete(reviewId);
    await camp.save();

    return camp;
};
