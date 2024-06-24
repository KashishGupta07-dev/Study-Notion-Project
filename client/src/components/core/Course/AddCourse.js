import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { CourseInformationForm } from "./Forms/CourseInformationForm";
import { setStep } from "../../../reducers/slices/CourseSlice";
import { CourseBuilderForm } from "./Forms/CourseBuilderForm";
import { setEditCourse,setCourse } from "../../../reducers/slices/CourseSlice";
import { PublishCourseForm } from "./Forms/PublishCourseForm";
export const AddCourse = () => {
  const dispatch = useDispatch();
  const {editCourse} = useSelector((state)=>state.course);
  const data = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  useEffect(()=>{
    if(editCourse){
    dispatch(setStep(1));
    }
    else{
    dispatch(setStep(1));
    dispatch(setEditCourse(false));
    dispatch(setCourse(null));
    }
        // eslint-disable-next-line
  },[])
  const { step } = useSelector((state) => state.course);
  return (
    <div className=" h-[calc(100vh-3.5rem)] overflow-auto">
    <div className="w-11/12 max-w-maxContent mx-auto mt-14 mb-14">
      <div className="text-richblack-5 font-semibold text-3xl">Add Course</div>
      <div className="flex flex-row pointer-events-none mt-9 ml-24">
        {
            data.map((element)=>(
                <div className="w-full transition-all duration-200" key={element.id}>
                <div className="flex flex-row">
                <div className={`${element.id<=step ?"bg-yellow-900 text-yellow-50 border-yellow-50":"bg-richblack-800 text-richblack-300 border-richblack-700"} flex items-center justify-center w-[50px] aspect-square rounded-full  border-[1px] `}>
                  { element.id<step ? <FaCheck/>:
                    `${element.id}`
                    }
                </div>
                <div className={`${element.id === 3?"invisible w-0":"visible mt-[0.4rem]"} ${element.id<step?"border-yellow-50":"border-richblack-500"} h-[calc(34px/2)] w-full  border-dashed border-b-2 `}></div>
                </div>
                <div className={`text-sm font-semibold ${element.id>step?"text-richblack-500" :"text-richblack-5"}`}>{element.title}</div>
                </div>
            ))
        }
      </div>
      { 
        step===1 && <CourseInformationForm/>
      }
      {
        step===2 && <CourseBuilderForm/>
      }
      {
        step===3 && <PublishCourseForm/>
      }
    </div>
    </div>
  );
};
