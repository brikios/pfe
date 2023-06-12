export const updatePropertyRating = async (property, rating) => {
  const existingRatingSum = property.rating || 0;
  const existingTotalRatingSum = property.totalRatingCount || 0;

  //const updatedRatingSum = parseInt(existingRatingSum) + parseInt(rating);
  const updatedTotalRatingSum = parseInt(existingTotalRatingSum) + parseInt(rating);
  
  const updatedRatingCount = property.ratingCount + 1;
  const updatedRatingAverage = updatedTotalRatingSum / updatedRatingCount;

  property.totalRatingCount = updatedTotalRatingSum || 0;
  property.rating = updatedRatingAverage.toFixed(1);
  property.ratingCount = updatedRatingCount;

  await property.save();
};
