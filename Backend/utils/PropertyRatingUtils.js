export const updatePropertyRating = async (property, rating) => {
  const existingRatingSum = property.rating || 0;
  const updatedRatingSum = parseInt(existingRatingSum) + parseInt(rating);
  const updatedRatingCount = property.ratingCount + 1;
  const updatedRatingAverage = updatedRatingSum / updatedRatingCount;
  property.rating = updatedRatingAverage;
  property.ratingCount = updatedRatingCount;

  await property.save();
};
