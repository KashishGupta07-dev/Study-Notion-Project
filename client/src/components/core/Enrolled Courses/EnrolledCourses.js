import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCoursesApi } from '../../../services/operations/coursesApi';
import {Spinner} from "../common/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from 'react-router-dom';
export const EnrolledCourses = () => {
  const {token} = useSelector((state)=>state.auth);
  const [loading,setLoading] = useState(false);
  const [userDetails,setUserDetails] = useState(null);
  const dispatch = useDispatch();
  useEffect(()=>{
    setLoading(true);
    dispatch(getEnrolledCoursesApi(token,setUserDetails));
    setLoading(false);
  },[])
  return (
    loading?<Spinner/> : 
    <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
    <div className='w-11/12 mx-auto mt-12'>
    <div className='text-3xl text-richblack-5 font-semibold'>Enrolled Courses</div>
    <table className='w-full border-[1px] border-richblack-700 my-7'>
    <thead>
        <tr className='bg-[#2C333F] text-richblack-50 font-semibold border-b-[1px] border-richblack-700'>
          <td className='py-3 px-4'>Course Name</td>
          <td>Durations</td>
          <td>Progress</td>
        </tr>
        </thead>
        <tbody>
        {
          userDetails && userDetails?.courses?.length>0 ? userDetails?.courses.map((course)=>(
            <tr key={course?._id} className='border-b-[1px] border-richblack-700'>
              <td className='w-[55%]'>
              <Link to={`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`} className='flex flex-row items-center gap-x-4 py-4 px-4'>
                <img src={course?.thumbnail} className='w-[150px] h-[100px] aspect-square rounded-md object-cover'/>
                <div className='flex flex-col gap-y-4'>
                  <div className=' text-richblack-5 font-semibold'>{course?.courseName}</div>
                  <div className='text-sm text-richblack-200 font-medium'>{course?.courseDescription}</div>
                </div>
                </Link>
              </td>
              <td className='text-richblack-100 text-lg'>
              <div> {"2hr 30min"}</div>
              </td>
              <td>
              <div className='flex flex-col gap-y-3 w-fit '>
              <div className='text-richblack-200 text-sm font-semibold'>{"Progress : 40%"}</div>
                <ProgressBar completed={40}  height='10px'  isLabelVisible={false} baseBgColor='#2C333F' bgColor='#47A5C5' />
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
