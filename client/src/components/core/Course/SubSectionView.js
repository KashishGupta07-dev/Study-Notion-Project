import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { SubSectionForm } from './Forms/SubSectionForm';
export const SubSectionView = ({section,courseId}) => {
    const [editing,setEditing] = useState(false);
    const [viewing,setViewing] = useState(false);
    const [adding,setAdding] = useState(false);
    const [showSubSectionForm,setShowSubSectionForm] = useState(false);
    console.log("Section : ",section.subSection);
    function editSubSection(event,subSection){
        event.stopPropagation();
        setShowSubSectionForm(true)
        setEditing(subSection);
        setViewing(false);
        setAdding(false);
    }
    function viewSubSection(subSection){
        setShowSubSectionForm(true);
        setViewing(subSection);
        setEditing(false);
        setAdding(false);
    }
    function addSubSection(event){
        event.preventDefault();
        setShowSubSectionForm(true);
        setAdding(true);
        setEditing(false);
        setViewing(false);
    }
  return (
    <div>
    {
       section.subSection &&  section.subSection.map((subSection)=>(
        <div className='mx-10 cursor-pointer' key={subSection._id} onClick={()=>viewSubSection(subSection)}>
        <div className='pb-6 flex flex-col h-fit'>
        <div className='flex flex-row justify-between text-richblack-5 font-bold'>
        <div className='flex flex-row items-center gap-2'>
          <RxDropdownMenu size={"25px"}/>
          <div>{subSection.title}</div>
          </div>
          <div className='flex flex-row gap-2 items-center'>
          <MdEdit size={"20px"} className='cursor-pointer hover:scale-110 hover:text-caribbeangreen-200 ' onClick={(event)=>editSubSection(event,subSection)}/>
          <div>
          <RiDeleteBin6Fill size={"20px"} className='cursor-pointer' />
          </div>
          </div>
          </div>
          <div className=' mt-6 h-[2px] bg-richblack-400 w-full'></div>
        </div>
        </div>
       ))
    }
    <button className='bg-transparent text-yellow-50 flex gap-1 text-lg font-semibold items-center mb-6' onClick={addSubSection}>
    <MdAdd size={"30px"} className='font-bold'/>
    <div>Add Lecture</div>
    </button>
    {
    showSubSectionForm && <SubSectionForm viewing={viewing} editing={editing} adding={adding}  setShowSubSectionForm={setShowSubSectionForm} sectionId={section._id} addCourseId={courseId}/>
    }
    </div>
  )
}
