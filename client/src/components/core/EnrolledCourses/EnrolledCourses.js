import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCoursesApi } from '../../../services/operations/coursesApi';
import {Spinner} from "../common/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from 'react-router-dom';
export const EnrolledCourses = () => {
  const {token} = useSelector((state)=>state.auth);
  const [loading,setLoading] = useState(false);
  const [userDetails,setUserDetails] = useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    setLoading(true);
    dispatch(getEnrolledCoursesApi(token,setUserDetails,setLoading));
    // eslint-disable-next-line
  },[]);
  function totalLectures(course){
    let totalLectures = 0;
    course?.courseContent?.forEach((section)=>{
      totalLectures+=Number(section?.subSection?.length);
    })
    return totalLectures;
  }
  function totalTimeDuration(course){
    let timeDuration = 0;
    course?.courseContent?.forEach((section)=>{
      section?.subSection?.forEach((subSection)=>{
        timeDuration+=Number(subSection?.timeDuration);
      })
    })
    let returningString = "";
    timeDuration = Math.round(timeDuration);
    const seconds = timeDuration%60;
    const hours = Math.floor((timeDuration/60)/60);
    const minutes = (Math.floor(timeDuration/60))%60;
   if(hours >  0){
    returningString += `${hours}h `;
   }
   if(minutes > 0 ){
    returningString += `${minutes}m `;
   }
   if(seconds > 0){
    returningString += `${seconds}s`;
   }
   if(returningString?.length>0){
      return (returningString) 
   }
      return "0s"
}
  return (
    loading?<Spinner/> : 
    <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
    <div className='w-11/12 mx-auto mt-12'>
    <div className='text-3xl text-richblack-5 font-semibold'>Enrolled Courses</div>
    <table className='w-full border-[1px] border-richblack-700 my-7'>
    <thead>
        <tr className='bg-[#2C333F] text-richblack-50 font-semibold border-b-[1px] border-richblack-700'>
          <td className='py-3 px-4'>Course Name</td>
          <td>
          <div className='hidden lg:block'>Durations</div></td>
          <td className="w-[25%]">Progress</td>
        </tr>
        </thead>
        <tbody>
        {
          userDetails && userDetails?.courses?.length>0 ? userDetails?.courses.map((course)=>(
            <tr key={course?._id} className='border-b-[1px] border-richblack-700'>
              <td className='w-[55%]'>
              <Link to={`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`} className='flex flex-row items-center gap-x-4 py-4 px-4'>
                <img src={course?.thumbnail} alt='thumbnail' className='w-[150px] h-[100px]  rounded-md object-cover'/>
                <div className='flex flex-col gap-y-4'>
                  <div className=' text-richblack-5 font-semibold text-sm sm:text-base'>{course?.courseName}</div>
                  <div className='text-sm text-richblack-200 font-medium hidden lg:block'>{course?.courseDescription?.substr(0,150) + "..."}</div>
                </div>
                </Link>
              </td>
              <td className='text-richblack-100 text-lg'>
              <div className='hidden lg:block'> {totalTimeDuration(course)}</div>
              </td>
              <td>
              <div className='flex flex-col gap-y-3 w-fit'>
              <div className='text-richblack-200 text-xs sm:text-sm font-semibold'>{`Progress : ${userDetails?.courseProgress?.filter((progress)=>progress.courseId === course?._id)?.[0]?.completedVideos?.length ?Math.floor(((userDetails?.courseProgress?.filter((progress)=>progress.courseId === course?._id)?.[0]?.completedVideos?.length)/totalLectures(course))*100) : 0}%`}</div>
                <ProgressBar completed={userDetails?.courseProgress?.filter((progress)=>progress.courseId === course?._id)?.[0]?.completedVideos?.length ?Math.floor(((userDetails?.courseProgress?.filter((progress)=>progress.courseId === course?._id)?.[0]?.completedVideos?.length)/totalLectures(course))*100)  : 0}  height='10px'  isLabelVisible={false} baseBgColor='#2C333F' bgColor='#47A5C5'/>
               </div>
              </td>
            </tr>
          ))
          :<tr>
          <td><div className='text-richblack-200 text-lg font-semibold py-4 text-end'>You Have Not Enrolled in Any Course</div></td>
          </tr>
        }
        </tbody>
    </table>
    </div>
    </div>
  )
}
