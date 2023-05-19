export async function updatePropertyRating(property) {
    const existingRatingSum = property.ratings.reduce((sum, ratingObj) => sum + ratingObj.rating, 0);
    const updatedRatingSum = existingRatingSum + rating;
    const updatedRatingCount = property.ratings.length + 1;
    const updatedRatingAverage = updatedRatingSum / updatedRatingCount;
    property.rating = updatedRatingAverage;
  
   
    await property.save();
  }