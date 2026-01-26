const express=require("express");
const reviewController=require("../controllers/review.controllers");
const validateReview=require("../middlewares/reviewSchemaValidation.middleware");

const reviewRouter=express.Router({mergeParams:true});

reviewRouter.post("/",validateReview,reviewController.createReview);
reviewRouter.delete("/:reviewId",reviewController.deleteReview);

module.exports=reviewRouter; 