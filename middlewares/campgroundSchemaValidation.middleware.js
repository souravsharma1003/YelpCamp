const Joi=require("joi");
const ExpressError = require("../utils/ExpressError.util");

const campgroundSchema=Joi.object({
    title:Joi.string().required(),
    price:Joi.number().required().min(0),
    description:Joi.string().required(),
    location:Joi.string().required(),
    image:Joi.string().required()
})

const validateCampgroundSchema=(req,res,next)=>{
    const { error } = campgroundSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const messages = error.details.map(d => d.message);
        throw new ExpressError(messages.join(", "), 400);
    }

    next();
}

module.exports=validateCampgroundSchema;