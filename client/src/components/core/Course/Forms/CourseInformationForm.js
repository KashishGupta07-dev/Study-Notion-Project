import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TbCoinRupee } from "react-icons/tb";
import { getAllCategories } from '../../../../services/operations/Categories';
import { Spinner } from '../../common/Spinner';
import { FaChevronRight } from "react-icons/fa";
import { Tag } from '../Tag';
import { Upload } from '../Upload';
import { Instructions } from '../Instructions';
import { useDispatch } from 'react-redux';
import { createCourse, editCourseApi } from '../../../../services/operations/coursesApi';
import { useSelector } from 'react-redux';
import { setStep } from '../../../../reducers/slices/CourseSlice';
import toast from 'react-hot-toast';
export const CourseInformationForm = () => {
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const {course} = useSelector((state)=>state.course);
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors}
    } = useForm();
    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState(null);
    const {editCourse} = useSelector((state)=>state.course);
    useEffect(()=>{
        getAllCategories(setLoading,setCategories);
    },[])
    useEffect(()=>{
      if(editCourse){
        setValue("courseTitle",course?.courseName);
        setValue("courseShortDescription",course?.courseDescription);
        setValue("benefitsOfCourse",course?.whatYouWillLearn);
        setValue("coursePrice",course?.price);
        setValue("courseCategory",course?.category?.name);
        setValue("courseThumbnail",course?.thumbnail);
      }
      // eslint-disable-next-line
    },[])
    function submitHandler(data){
      const allValues = getValues();
      const formData = new FormData();
      if(editCourse){
        formData.append("courseId",course._id);
       if(!isUpdated())
        {
          toast.error("Please Update Course");
          return;
        }
        if(course?.courseName !== allValues.courseTitle){
          formData.append("courseName",allValues.courseTitle);
        }
        if(course?.courseDescription !== allValues.courseShortDescription){
          formData.append("courseDescription",allValues.courseShortDescription);
        }
        if(course?.whatYouWillLearn !== allValues.benefitsOfCourse){
          formData.append("whatYouWillLearn",allValues.benefitsOfCourse);
        }
        if(course?.price !== allValues.coursePrice){
          formData.append("price",allValues.coursePrice);
        }
        if(course?.category?.name !== allValues.courseCategory){
          formData.append("category",allValues.courseCategory);
        }
        if(course?.instructions !== allValues.instructions){
          formData.append("instructions",allValues.instructions);
        }
        if(course?.image !== allValues.courseThumbnail){
          formData.append("image",allValues.courseThumbnail);
        }
        dispatch(editCourseApi(formData,token));
        return;
      }
      formData.append("courseName",allValues.courseTitle);
      formData.append("courseDescription",allValues.courseShortDescription);
      formData.append("whatYouWillLearn",allValues.benefitsOfCourse);
      formData.append("price",allValues.coursePrice);
      formData.append("category",allValues.courseCategory);
      formData.append("tag",allValues.tag);
      formData.append("instructions",allValues.instructions);
      formData.append("image",allValues.courseThumbnail);
      dispatch(createCourse(formData,token))
    }
    function isUpdated(){
      const allValues = getValues();
      if(course?.courseName === allValues.courseTitle && course?.courseDescription === allValues.courseShortDescription  && course?.whatYouWillLearn === allValues.benefitsOfCourse && course?.price === allValues.coursePrice
      && course?.category.name === allValues.courseCategory && String((course?.tag[0]).split(",")) === String(allValues.tag)
      && String((course?.instructions[0]).split(",")) === String(allValues.instructions) && String(course?.thumbnail) === String(allValues.courseThumbnail)
      ){
        return false;
      }
      return true;
    }
  return (
    loading?<Spinner/>:
    <form
    className=" bg-richblack-800 py-8 px-10 mt-8 rounded-md border-[1px] border-richblack-700 flex flex-row justify-between items-baseline"
  onSubmit={handleSubmit(submitHandler)}
  >
      <div className="flex flex-col gap-12 w-full">
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
            Course Title <sup className="text-pink-400">*</sup>
          </p>
          <input
            placeholder="Enter Course Title"
            type="text"
            name="courseTitle"
            className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
            }}
            {...register("courseTitle", {
              required: {
                value: true,
                message: "Please Enter Course Title",
              },
            })}
          />
          {errors.courseTitle && (
            <span className="mt-1 text-[12px] text-yellow-100">
              {errors.courseTitle.message}
            </span>
          )}
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
            Course Short Description <sup className="text-pink-400">*</sup>
          </p>
          <textarea
            placeholder="Enter Course Short Description"
            rows={6}
            name="courseShortDescription"
            className="bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
            }}
            {...register("courseShortDescription",{
                required:{value:true,message:"Please Enter Course Short Description"}
            })}
          />
          {errors.courseShortDescription && (
            <span className="mt-1 text-[12px] text-yellow-100">
              {errors.courseShortDescription.message}
            </span>
          )}
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
            Course Price <sup className="text-pink-400">*</sup>
          </p>
          <div className='relative'>
          <input
            placeholder="Enter Course Price"
            type="number"
            name="coursePrice"
            className="bg-richblack-700 rounded-md pr-4 pl-10 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
            }}
            {...register("coursePrice", {
              required: {
                value: true,
                message: "Please Enter Course Price",
              },
            })}
          />
          <div className='absolute top-3 left-2 text-richblack-50'>
          <TbCoinRupee size={"25px"}/>
          </div>
          </div>
          {errors.coursePrice && (
            <span className="mt-1 text-[12px] text-yellow-100">
              {errors.coursePrice.message}
            </span>
          )}
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
            Course Category <sup className="text-pink-400">*</sup>
          </p>
          <select
            name="courseCategory"
            defaultValue={""}
            className="bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
            }}
            {...register("courseCategory", {
              required: { value: true, message: "Please Enter Course Category" },
            })}
          >
          <option value="" disabled>Create A Category</option>
          {
            !loading&&categories?.map((element,index)=>(
                <option key={index}>{element?.name}</option>
            ))
          }
          </select>
        </label>
        <Tag register={register} setValue={setValue} getValues={getValues}/>
        <div className='w-full'>
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
        Course Thumbnail <sup className="text-pink-400">*</sup></p>
        <Upload register={register} setValue={setValue}  getValues={getValues}/>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
            Benefits Of The Course <sup className="text-pink-400">*</sup>
          </p>
          <textarea
            placeholder="Enter Benefits Of The Course"
            rows={6}
            name="benefitsOfCourse"
            className="bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
            }}
            {...register("benefitsOfCourse",{
                required:{value:true,message:"Please Enter Course Short Description"}
            })}
          />
          {errors.benefitsOfCourse && (
            <span className="mt-1 text-[12px] text-yellow-100">
              {errors.benefitsOfCourse.message}
            </span>
          )}
        </label>
        <Instructions register={register} setValue={setValue}  getValues={getValues}/>
      <div className="flex justify-end">
       {editCourse?<div className='flex flex-row gap-4'>
       <button className="bg-richblack-200 text-black px-6 rounded-md cursor-pointer py-2 font-semibold" onClick={(event)=>{
        event.preventDefault();
        dispatch(setStep(2));
       }}>
          Continue Without Saving
       </button>
        <button
          className="bg-yellow-50 text-black px-6 rounded-md cursor-pointer py-2 font-semibold"
        type='submit'><div className='flex items-center gap-x-3'>
            <div>Save Changes</div>
            <FaChevronRight/>
        </div></button>
       </div>: <button
          type="submit"
          className="bg-yellow-50 text-black px-6 rounded-md cursor-pointer py-2 font-semibold"
        ><div className='flex items-center gap-x-3'>
            <div>Next</div>
            <FaChevronRight/>
        </div></button>
       }
      </div>
    </div>
  </form>
  )
}
