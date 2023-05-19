import { Review, Property } from "../models/index.js";
import { updatePropertyRating } from "../utils/propertyUtils.js";


export const addReview=async(req, res,next)=>{
  try {
    const { propertyId, userId, rating, reviewText } = req.body; 
    const property = await Property.findById(propertyId);
    if (!property) {
        next("there is no property")
        }
    const user = await User.findById(userId);
    if (!user) {
      next("there is no user");
    }

    const newReview = new Review({
      user: userId,
      property: propertyId,
      rating,
      reviewText,
    });
      await newReview.save();
    await updatePropertyRating(property);
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    next(error)
  }
}

