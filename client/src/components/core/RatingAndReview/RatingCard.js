import React from 'react'
import { Rating } from '../common/Rating';
export const RatingCard = ({rating}) => {
  return (
    <div className="px-4 py-2 flex flex-col gap-y-4">
    <div className="flex flex-row flex-wrap gap-x-3 items-center">
      <img
        src={rating?.user?.image}
        alt="user"
        className="w-[60px] h-[60px] rounded-full object-cover"
      />
      <div>
        <div className="font-bold text-richblack-5">{`${rating?.user?.firstName} ${rating?.user?.lastName}`}</div>
        <div className="text-xs text-richblack-200">
          {rating?.course?.courseName}
        </div>
      </div>
    </div>
    <div className="text-richblack-5 text-xs">{rating?.review}</div>
    <div className="flex flex-row gap-x-2 font-semibold items-center">
      <div className="text-yellow-50  text-sm">{`${rating?.rating}.0`}</div>
      <Rating
        starValue={rating?.rating}
        readOnly={true}
        customClass={{
          size: "16px",
        }}
      />
    </div>
  </div>
  )
}
