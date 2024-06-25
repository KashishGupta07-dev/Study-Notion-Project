import React, {  useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { UploadVideo } from '../UploadVideo';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, editSubSectionApi } from '../../../../services/operations/coursesApi';
import toast from 'react-hot-toast';

export const SubSectionForm = ({ adding,viewing,editing, setShowSubSectionForm ,sectionId,addCourseId}) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const {token} = useSelector((state)=>state.auth);
  const courseId = addCourseId || location.pathname.split("/").at(-1);
  useEffect(()=>{
    if(editing || viewing){
      setValue("lectureTitle",(viewing || editing).title);
      setValue("lectureDescription",(viewing || editing).description);
    }
    // eslint-disable-next-line
  },[])
  function isFormUpdated(){
    const allValues = getValues();
    if(allValues.lectureTitle === editing.title && allValues.lectureDescription === editing.description && allValues.lectureVideo === editing.videoUrl){
      return false;
    }
    return true;
  }
  const submitHandler = (data) => {
    const formData = new FormData();
       formData.append("courseId",courseId);
       if(!isFormUpdated() && editing){
        toast.error("Please Update Sub Section");
        setShowSubSectionForm(false);
        return;
       }
    if(isFormUpdated() && editing){
      formData.append("subSectionId",editing._id);
      if(data.lectureTitle !== editing.title){
        formData.append("title",data.lectureTitle);
      }
      if(data.lectureVideo !== editing.videoUrl){
        formData.append("video",data.lectureVideo);
        formData.append("timeDuration",data.timeDuration);
      }
      if(data.lectureDescription !== editing.description ){
        formData.append("description",data.lectureDescription);
      }
      dispatch(editSubSectionApi(formData,token));
      setShowSubSectionForm(false);
      return;
    }
    formData.append("title",data.lectureTitle);
    formData.append("timeDuration",data.timeDuration);
    formData.append("description",data.lectureDescription);
    formData.append("video",data.lectureVideo);
    formData.append("sectionId",sectionId);
    dispatch(createSubSection(formData,token));
    setShowSubSectionForm(false);
    };

  return (
    <div className='fixed overflow-auto w-full left-0 bottom-0 right-0 top-0 h-full bg-opacity-10 backdrop-blur-sm flex items-center justify-center bg-white cursor-default'>
      <div className=' w-full h-5/6'>
        <div className='w-8/12 mx-auto bg-richblack-800 rounded-lg border-[0.5px] border-richblack-5 h-fit'>
          <div className='flex justify-between items-center py-4 text-richblack-5 bg-richblack-700 text-bold text-xl px-7 rounded-t-lg'>
            <div>{`${adding?"Adding" : editing ? "Editing" : "Viewing"} Lecture`}</div>
            <RxCross2 size={"25px"} className='cursor-pointer' onClick={() => setShowSubSectionForm(false)} />
          </div>
          <div className='w-11/12 mx-auto my-8 flex flex-col gap-y-8 pb-8'>
            <div className='w-full'>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
                Lecture Video <sup className="text-pink-400">*</sup>
              </p>
              <UploadVideo setValue={setValue} errors={errors} register={register} editing={editing} viewing={viewing}/>
                      {errors.lectureVideo && (
              <span className="mt-1 text-[12px] text-yellow-100">
                {errors.lectureVideo.message}
              </span>
            )}
            </div>
            <label className={`w-full  ${viewing ? "pointer-events-none":""}`}>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
                Lecture Title <sup className="text-pink-400">*</sup>
              </p>
              <input
                placeholder="Enter Lecture Title"
                type="text"
                name='lectureTitle'
                className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
                style={{ boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset" }}
                {...register('lectureTitle', {
                  required: { value: true, message: "Please Enter Lecture Title" }
                })}
              />
              {errors.lectureTitle && (
                <span className="mt-1 text-[12px] text-yellow-100">
                  {errors.lectureTitle.message}
                </span>
              )}
            </label>
            <label className={`w-full  ${viewing ? "pointer-events-none":""}`}>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
                Lecture Description <sup className="text-pink-400">*</sup>
              </p>
              <textarea
                placeholder="Enter Lecture Description"
                rows={5}
                name='lectureDescription'
                className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
                style={{ boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset" }}
                {...register("lectureDescription", {
                  required: { value: true, message: "Please Enter Lecture Description" }
                })}
              />
              {errors.lectureDescription && (
                <span className="mt-1 text-[12px] text-yellow-100">
                  {errors.lectureDescription.message}
                </span>
              )}
            </label>
            
            {
              (editing || adding) && <button className='bg-yellow-50 font-bold py-2 px-4 rounded-md self-end w-fit' onClick={handleSubmit(submitHandler)}>Save</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
