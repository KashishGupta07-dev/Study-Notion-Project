import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useLocation, useNavigate, useParams } from 'react-router';
import { MdKeyboardArrowDown } from "react-icons/md";
export const CourseSideBar = ({setReviewModal}) => {
  const navigate = useNavigate();
  const {sectionId,subSectionId} = useParams();
  const {courseDetails,sectionDetails,totalLectures,completedLectures} = useSelector((state)=>state.viewCourse);
  const [activeSection,setActiveSection] = useState("");
  const location = useLocation();
  const {user} = useSelector((state)=>state.profile);
  const [activeSubSection,setActiveSubSection] = useState("");
  useEffect(()=>{
    if(sectionDetails && sectionDetails?.length>0){
      const findIndexSection = sectionDetails?.findIndex((section) => section._id === sectionId);
      const findSubSectionIndex = sectionDetails?.[findIndexSection]?.subSection?.findIndex((subSection)=>subSection._id === subSectionId);
      setActiveSection(sectionDetails?.[findIndexSection]?._id);
      setActiveSubSection(sectionDetails?.[findIndexSection]?.subSection?.[findSubSectionIndex]?._id);
      if(! findIndexSection<0  || findSubSectionIndex<0){
        navigate(`/view-course/${courseDetails?._id}/section/${sectionDetails?.[0]?._id}/sub-section/${sectionDetails?.[0]?.subSection?.[0]?._id}`);
    }
  }
  // eslint-disable-next-line
},[courseDetails,sectionDetails,location.pathname]);
  function timeDuration(section){
    let timeDuration = 0;
    for(const key in section?.subSection){    
            timeDuration+=section?.subSection[key]?.timeDuration;
    }
    let returningString = "";
    timeDuration = Math.round(timeDuration);
    const seconds = timeDuration%60;
    const hours = Math.floor((timeDuration/60)/60);
    const minutes = (Math.floor(timeDuration/60))%60;
   if(hours >  0){
    returningString += `${hours}h`;
   }
   if(minutes > 0 ){
    returningString += `${minutes}m`;
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
    <div className=' min-w-[220px] max-w-max bg-richblack-800 h-[calc(100vh-3.5rem)] text-richblack-200 border-r-[0.5px] border-richblack-700'>
    <div className='w-11/12 mx-auto pt-5 flex flex-col gap-y-4'>
        <div className='flex flex-row justify-between'>
            <button className='bg-richblack-100 text-richblack-900 flex items-center justify-center aspect-square px-2 rounded-full' onClick={()=>navigate("/dashboard/enrolled-courses")}>
              <MdOutlineArrowBackIos size={"25px"}/>
            </button>
              <button className={`bg-yellow-50 px-4 py-2 font-bold rounded-md text-black  ${courseDetails?.ratingAndReview?.some((rating) => rating?.user === user?._id)?"opacity-0 invisible pointer-events-none":""}`} onClick={()=>setReviewModal(true)}>Add Review</button>
        </div>
        <div className='text-lg font-semibold text-richblack-5'>{courseDetails?.courseName}</div>
        <div className='text-sm text-richblack-200'>{`Completed Lectures : ${completedLectures?.length}/${totalLectures}`}</div>
       <div>
        {
          sectionDetails?.map((section)=>(
            <div key={section?._id} className='border-[1px]  border-richblack-300 cursor-pointer' onClick={()=>setActiveSection(section?._id)}>
              <div className='flex bg-richblack-700 flex-row justify-between px-2 py-2'>
                  <div className='flex flex-row gap-x-1 text-richblack-5'>
                        <div>
                          <MdKeyboardArrowDown size={"22px"}/>
                        </div>
                  <div>{section?.sectionName}</div>
                  </div>
                  <div className='text'>{timeDuration(section)}</div>
              </div>
              {
               activeSection === section._id && <div>
                {
                  section?.subSection && section?.subSection?.length>0 && section?.subSection?.map((subSection)=>(
                    <div className={`${activeSubSection === subSection._id && "bg-yellow-50 text-black font-semibold"}  flex flex-row px-2 gap-x-2 py-2 cursor-pointer`} key={subSection?._id} onClick={()=>navigate(`/view-course/${courseDetails?._id}/section/${section?._id}/sub-section/${subSection?._id}`)}>
                      <input type="checkbox" size={"30px"}/>
                      <div>{subSection?.title}</div> 
                    </div>
                  ))
                }
              </div>
              }
            </div>
          ))
        }
       </div>
        </div>
    </div>
  )
}
