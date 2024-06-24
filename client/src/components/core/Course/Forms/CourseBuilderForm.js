import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from '../../common/Spinner';
import { useDispatch } from 'react-redux';
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux';
import { addSectionApi, deleteSectionApi } from '../../../../services/operations/coursesApi';
import { editSectionApi } from '../../../../services/operations/coursesApi';
import toast from 'react-hot-toast';
import { Modal } from '../../common/Modal';
import { setEditCourse } from '../../../../reducers/slices/CourseSlice';
import { setStep } from '../../../../reducers/slices/CourseSlice';
import { SectionView } from '../SectionView';
import { FaAngleRight } from "react-icons/fa6";
export const CourseBuilderForm = () => {
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
    // eslint-disable-next-line
    const [loading,setLoading] = useState(false);
    const [editSectionDetails,setEditSectionDetails] = useState(null);
    const [editSection,setEditSection] = useState(false);
    const [showModal,setShowModal] = useState(false);
    function addSectionHandler(event){
      event.preventDefault();
      const allValues = getValues();
      const formData = new FormData();
      formData.append("sectionName",allValues.sectionName);
      formData.append("courseId",course?._id);
      dispatch(addSectionApi(formData,token));
      setValue("sectionName","");
    }
    function editSectionHandler(event){
      event.preventDefault();
      const allValues = getValues();
      if(editSectionDetails.sectionName === allValues.sectionName ){
        toast.error("You Have Not Updated The Section");
        return;
      }
      const formData = new FormData();
      formData.append("sectionName",allValues.sectionName);
      formData.append("sectionId",editSectionDetails.sectionId);
      formData.append("courseId",course._id);
      dispatch(editSectionApi(formData,token));
      setValue("sectionName","");
      setEditSection(false);
      setEditSectionDetails(null);
    }

    function deleteSectionHandler(event){
      event.preventDefault();
        setShowModal(false);
        const formData = new FormData();
        formData.append("sectionId",editSectionDetails.sectionId);
        formData.append("courseId",course._id);
        dispatch(deleteSectionApi(formData,token));
    }
    function cancelHandler(event){
      event.preventDefault();
      setShowModal(false);
      setEditSectionDetails(false);
    }
    function submitHandler(data){
       console.log("Hello ");
    }
  return (
    loading?<Spinner/>:
    <form
    className=" bg-richblack-800 py-8 px-10 mt-8 rounded-md border-[1px] border-richblack-700" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-12 w-full">
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
            Section Name <sup className="text-pink-400">*</sup>
          </p>
          <input
            placeholder="Add A Section To Build Your Course"
            type="text"
            name="sectionName"
            className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
            }}
            {...register("sectionName", {
              required: {
                value: true,
                message: "Please Enter Section Name",
              },
            })}
          />
          {errors.sectionName && (
            <span className="mt-1 text-[12px] text-yellow-100">
              {errors.sectionName.message}
            </span>
          )}
          {
            <div className='flex flex-row gap-x-8 items-end'>
  <button onClick={editSection?editSectionHandler:addSectionHandler} className=' flex items-center gap-2 px-4 mt-3 text-yellow-50 font-bold border-[1px] border-yellow-50 rounded-md w-fit  py-2' >
         <div>{
          editSection?"Edit Section":
          "Create Section"
          }</div> 
         <IoIosAddCircleOutline size={"23px"}/>
          </button>
          {
            editSection&&<div className='text-richblack-400 underline cursor-pointer' onClick={(event)=>{
              event.preventDefault();
              setEditSectionDetails(null);
              setValue("sectionName","");
            }}>Cancel Edit</div>
          }
          </div>
        }
        <div>
        <SectionView setEditSectionDetails={setEditSectionDetails} editSection={editSection} setEditSection={setEditSection} setValue={setValue} setShowModal={setShowModal}/>
        </div>
        </label>
    </div>
    {showModal&&
      <Modal heading={"Delete this Section?"} subheading={"All the lectures in this section will be deleted"} firstBtnText={"Delete"} secondBtnText={"Cancel"} firstBtnClickHandler={deleteSectionHandler} secondBtnClickHandler={cancelHandler}/>
      }
      <div className='flex flex-row gap-4 mt-14 justify-end'>
        <button onClick={(event)=>{
          event.preventDefault();
          dispatch(setEditCourse(true));
          dispatch(setStep(1));
        }} className='bg-richblack-400 font-bold px-5 py-2 rounded-lg'>Back</button>
        <button className='flex gap-3  items-center bg-yellow-50 font-bold px-5 py-2 rounded-lg' type='submit' onClick={(e)=>{
          e.preventDefault();
          dispatch(setStep(3));
        }}>
        <div>Next</div>
        <FaAngleRight/>
        </button>
      </div>
  </form>
  )
}
