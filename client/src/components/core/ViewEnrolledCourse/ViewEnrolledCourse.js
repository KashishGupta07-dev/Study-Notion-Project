import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router'
import { CourseSideBar } from './CourseSideBar'
import { ReviewModal } from '../RatingAndReview/ReviewModal';
import { useSelector } from 'react-redux';
import { setCompletedLectures,setCourseDetails,setSectionDetails,setSubSectionDetails,setTotalLectures } from '../../../reducers/slices/ViewCourseSlice';
import { useDispatch } from 'react-redux';
import { getFullCourseDetailsApi } from '../../../services/operations/coursesApi';
import { Spinner } from '../common/Spinner';
export const ViewEnrolledCourse = () => {
  const {courseId} = useParams();
  const [reviewModal,setReviewModal] = useState(false);
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    dispatch(getFullCourseDetailsApi(courseId,token,setCompletedLectures,setCourseDetails,setSectionDetails,setSubSectionDetails,setTotalLectures,setLoading));
    // eslint-disable-next-line
  },[reviewModal]);
  return (
    loading?<Spinner/> : 
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
    <div>
     <CourseSideBar setReviewModal={setReviewModal}/>
    </div>
    <div className='w-full'>
        <Outlet/>
        </div>
        {
          reviewModal && <ReviewModal setReviewModal={setReviewModal} setLoading={setLoading} setCourseDetails={setCourseDetails}/>
        }
    </div>
  )
}
