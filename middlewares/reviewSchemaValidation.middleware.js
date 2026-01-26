const Joi=require("joi");
const ExpressError=require("../utils/ExpressError.util");

const reviewSchema=Joi.object({
    review:Joi.string().required(),
    rating:Joi.number().required().min(1).max(5)
})

const validateReview=async(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        const message=error.details.map(el=>el.message)
        next(new ExpressError(message.join(" ,")),400);
    }
    next();
}

module.exports=validateReview;