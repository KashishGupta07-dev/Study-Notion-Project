import React from 'react'
import { Rating } from '../common/Rating';
import { Link } from 'react-router-dom';
export const CourseCard = ({course}) => {
  return (
    <Link className='flex flex-col rounded-lg gap-2' to={`/course/${course._id}`}>
                <img src={course.thumbnail} alt='thumbnail' className='w-[350px] h-[210px] rounded-lg object-cover'/>
                <div className='text-richblack-5 font-semibold text-xl'>{course.courseName}</div>
                <div className='text-richblack-200 font-medium text-lg'>{`Created By : ${course.instructor.firstName} ${course.instructor.lastName?course.instructor.lastName : ""}`}</div>
                <div className='flex flex-row items-center text-lg text-richblack-200 gap-2'>
                <div className='text-yellow-50'>{0}</div>
                <Rating starValue={0} readOnly={true}/>
                <div>{`${0} Ratings`}</div>
                </div>
                <div className='text-richblack-5 text-lg font-semibold'>{`₹ ${course.price}`}</div>
                </Link>
  )
}
