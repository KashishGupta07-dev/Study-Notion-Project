export const getAverageRating = (courseDetails)=>{
    let averageRating = 0;
    courseDetails?.ratingAndReview?.forEach((ratingAndReview)=>{
        averageRating += Number(ratingAndReview?.rating);
    })
    return averageRating? (averageRating/(courseDetails?.ratingAndReview?.length)).toFixed(2) : 0;
}