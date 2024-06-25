import React from 'react'
import { useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { SubSectionView } from './SubSectionView';
export const SectionView = ({editSection,setShowModal,setEditSection,setValue,setEditSectionDetails,setError,clearErrors}) => {
    const {course} = useSelector((state)=>state.course);
    function deleteHandler(event,sectionId){
        event.preventDefault();
          setShowModal(true);
          setEditSectionDetails({
            sectionId:sectionId,
          })
      }
    function editHandler(event,sectionName,sectionId){
        event.preventDefault();
        const newEditSection = !editSection;
        setEditSection(newEditSection);
        if(newEditSection){
          setValue("sectionName",sectionName);
          setEditSectionDetails({
            sectionName:sectionName,
            sectionId:sectionId,
          })
          }
          else{
            setEditSectionDetails(null);
            setValue("sectionName","");
          }
      }
  return (
    <div className={`${course?.courseContent.length>0?"block" : "hidden"}`}>
    <div className={`bg-richblack-600 flex flex-col mt-4 pt-8 rounded-md`}>
    {
      course?.courseContent.map((section)=>(
          <details className='mx-10 cursor-pointer' key={section._id} open>
            <summary className='pb-6 flex flex-col h-fit'>
            <div className='flex flex-row justify-between text-richblack-5 font-bold'>
            <div className='flex flex-row items-center gap-2'>
              <RxDropdownMenu size={"25px"}/>
              <div>{section.sectionName}</div>
              </div>
              <div className='flex flex-row gap-2 items-center'>
              <MdEdit size={"20px"} className='cursor-pointer hover:scale-110 hover:text-caribbeangreen-100' onClick={(event)=>editHandler(event,section.sectionName,section._id)}/>
              <div className='pr-4 border-r-[2px] border-richblack-100'>
              <RiDeleteBin6Fill size={"20px"} className='cursor-pointer hover:scale-110 hover:text-pink-200' onClick={(event)=>deleteHandler(event,section._id)}/>
              </div>
              <IoMdArrowDropdown size={"20px"}/>
              </div>
              </div>
              <div className=' mt-6 h-[2px] bg-richblack-400 w-full'></div>
            </summary>
            <SubSectionView section={section} courseId={course?._id}/>
          </details>
      ))
    }
    </div>
    </div>
  )
}
