import React, { useEffect, useState } from 'react'
import { IoAdd } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { MdOutlineAccessTime } from "react-icons/md";
import { useNavigate } from 'react-router';
import { FaCheckCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { setCourse,setEditCourse } from '../../../../reducers/slices/CourseSlice';
import { getAllCoursesApi } from '../../../../services/operations/coursesApi';
import { dateFormatter } from '../../../../services/operations/dateFormatter';
import { Modal } from '../../common/Modal';
import { deleteCourseApi } from '../../../../services/operations/coursesApi';
export const ViewCourse = () => {
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.auth);
  const[courses,setCourses] = useState(null);
  const {course} = useSelector((state)=>state.course);
  const [showModal,setShowModal] = useState(false); 
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setEditCourse(false));
    localStorage.setItem("editCourse",JSON.stringify(false));
    dispatch(getAllCoursesApi(token,setCourses));
    // eslint-disable-next-line
  },[course])
  function deletionHandler(){
    dispatch(deleteCourseApi(showModal.courseId,showModal.categoryId,token,setCourses));
    setShowModal(false);
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
    <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
    <div className='w-11/12 mt-14 mx-auto flex flex-col'>
      <div className='flex flex-row justify-between'>
        <div className='text-richblack-5 font-semibold text-3xl'>My Courses</div>
        <button className='px-4 py-2 flex flex-row gap-3 text-black rounded-md font-semibold bg-yellow-50 items-center' onClick={()=>navigate("/dashboard/add-course")}>
        <div>Add Course</div>
        <IoAdd size={"22px"}/>
        </button>
      </div>  
      <table className='w-full border-[0.5px] border-richblack-800 mt-10 mb-10 border-collapse'>
        <thead className='uppercase font-semibold text-richblack-200 text-sm border-[0.5px] border-richblack-800 border-collapse'>
          <tr>
          <td className='text-start pl-5'>Courses</td>
          <td className='text-start'>Duration</td>
          <td className='text-start'>Price</td>
          <td className='text-start'>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            courses && courses.length>0 ? courses.map((course)=>(
              <tr key={course._id} className='border-[0.5px] border-richblack-800 border-collapse'>
                <td className='flex flex-row my-5 ml-5 max-w-[500px]'>
                  <div className='flex flex-row gap-x-5'>
                  <img src={course?.thumbnail} alt='thumbnail' className='h-[148px] w-[220px] rounded-lg object-cover'/>
                  <div className='flex flex-col justify-between h-[148px]'>
                    <div className='font-semibold text-start text-richblack-5'>
                      {course?.courseName}
                    </div>
                    <div className='text-sm text-richblack-200 text-start font-light'>{course?.courseDescription?.substr(0,100) + `...`}</div>
                    <div className='text-xs text-richblack-5 text-start font-semibold'>{`Created At : ${dateFormatter(String(course?.createdAt))}`}</div>
                    <div className='flex flex-row w-fit bg-richblack-400 bg-opacity-40 gap-1 px-2 items-center rounded-xl'>
                      {
                        course?.status === "Draft" ?<MdOutlineAccessTime className=' text-pink-300'/> : <FaCheckCircle className=' text-caribbeangreen-200'/>
                      }
                      <div className= {`${course?.status === "Draft" ?"text-pink-300":"text-caribbeangreen-200"} font-light text-sm`}>{course?.status}</div>
                    </div>
                  </div>
                  </div>
                </td>
                <td className='text-richblack-100 font-medium'>{totalTimeDuration(course)}</td>
                <td className='text-richblack-100 font-medium'>{`₹ ${course?.price}`}</td>
                <td className=' text-richblack-100'>
                <div className='flex items-start gap-4 h-full transition-all duration-200'>
                  <div className='cursor-pointer bg-transparent hover:scale-110 hover:text-caribbeangreen-200' onClick={()=>{
                    dispatch(setCourse(course));
                    dispatch(setEditCourse(true));
                    localStorage.setItem("courseDetail",JSON.stringify(course));
                    localStorage.setItem("editCourse",JSON.stringify(true));
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }}><MdModeEdit size={"21px"}/></div>
                  <div className='cursor-pointer bg-transparent hover:scale-110 hover:text-pink-200' onClick={()=>setShowModal(
                    {
                      courseId : course?._id,
                      categoryId:course?.category?._id
                    }
                    )}><MdDelete size={"21px"}/></div>
                  </div>
                </td>
              </tr>
            )):<tr><td  className='flex w-full justify-end text-xl my-5 text-richblack-200'>No Courses Found</td></tr>
          }
          </tbody>
      </table>
      {showModal && <Modal heading={"Do you want to delete this course?"} subheading={"All the data related to this course will be deleted"} firstBtnText={"Delete"} secondBtnText={"Cancel"} firstBtnClickHandler={deletionHandler} secondBtnClickHandler={()=>setShowModal(false)}/>}
    </div>
    </div>
  )
}
