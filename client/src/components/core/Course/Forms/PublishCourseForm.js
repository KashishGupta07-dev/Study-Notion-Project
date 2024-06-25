import React, { useState } from 'react'
import { editCourseApi } from '../../../../services/operations/coursesApi'
import { setStep } from '../../../../reducers/slices/CourseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
export const PublishCourseForm = () => {
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const {course} = useSelector((state)=>state.course);
    const [checked,setChecked] = useState(course?.status);
    function submitHandler(){
        if(course?.status !== checked && course?.status !== "Published"){
            const formData = new FormData();
            formData.append("status",checked);
            formData.append("courseId",course?._id);
            dispatch(editCourseApi(formData,token));
        }
        navigate("/dashboard/my-courses");
        dispatch(setStep(1));
    }
    function changeHandler(event){
        if(course?.status === "Published"){
            event.preventDefault();
            return;
        }
        checked === "Draft" ? setChecked("Published") : setChecked("Draft");
    }
    return (
    <div className='rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 flex flex-col mt-10 gap-10 w-fit mx-auto'>
            <div className='text-xl text-richblack-5 font-semibold pr-80'>
                Publish Settings
            </div>
            <div className='flex flex-row items-center gap-3'>
            <input type="checkbox" name='publishCourse' checked={checked==="Published"} onChange={changeHandler} readOnly={course?.status === "Published"}/>
            <p className='text-lg font-medium text-richblack-200'>Make this course as public</p>
            </div>
            <div className='flex flex-row w-full items-center justify-end gap-4'>
                    <button className='py-2 px-4 font-bold rounded-md bg-richblack-200' onClick={(e)=>{
                        e.preventDefault();
                        dispatch(setStep(2));
                    }}>Back</button>
                    <button className='py-2 px-4 font-bold rounded-md bg-yellow-50' onClick={submitHandler}>Save Changes</button>
            </div>
    </div>
  )
}
