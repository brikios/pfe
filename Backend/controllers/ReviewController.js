import Review from "../models/Review.js";
import Property from "../models/Property.js";
import { updatePropertyRating } from "../utils/PropertyRatingUtils.js";


export const addReview=async(req, res,next)=>{
  try {
    const { propertyId,  rating, reviewText } = req.body; 
    const property = await Property.findById(propertyId);
    if (!property) {
        next("there is no property")
        }
    const user = req.user.id;
    if (!user) {
      next("there is no user");
    }

    const newReview = new Review({
      user: user,
      property: propertyId,
      rating,
      reviewText,
    });
      await newReview.save();
    await updatePropertyRating(property,rating);
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    next(error)
  }
}


export const getReviewsById=async(req,res)=>{
  try{
  const review= await Review.find({property :req.params.id}).populate('user')
  res.status(200).json(review)
}catch(err)
{
  res.status(500).json(err)
}
}
