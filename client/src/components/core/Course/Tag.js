import React, { useEffect, useState } from 'react'
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
export const Tag = ({register,setValue,errors,getValues}) => {
    const [tag,setTag] = useState([]);
    const {course,editCourse} = useSelector((state)=>state.course);
    const [inputFieldValue,setInputFieldValue] = useState("");
    useEffect(()=>{
      if(editCourse){
        setValue("tag",(course?.tag[0]).split(","));
        setTag((course?.tag[0]).split(","));
      }
        register("tag");
        // eslint-disable-next-line
    },[editCourse, course, register, setValue])
    useEffect(()=>{
        setValue("tag",tag);
        // eslint-disable-next-line
    },[tag]);
    function pressHandler(event){
        if(event.key === "Enter" || event.key===","){
            if(tag.some((t)=>t === event.target.value || event.target.value === "")){
                setInputFieldValue("");
                return;
            }
            setTag([...tag,event.target.value]);
            setInputFieldValue("");
            event.preventDefault();
        }
    }
    function changeHandler(event){
        if(event.target.value===","){
            return;
        }
        setInputFieldValue(event.target.value);
    }
    function removeHandler(oneTag){
        setTag(tag=>tag.filter((t)=>t !== oneTag));
    }
  return (
    <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
            Tag <sup className="text-pink-400">*</sup>
          </p>
          <div className='flex flex-wrap gap-x-2'>
            {
                tag.length>0 && tag.map((oneTag,index)=>(
                    <div className='flex flex-row gap-x-2 items-center bg-yellow-400 rounded-2xl px-2 mb-2 text-white' key={index}>
                        <div>{oneTag}</div>
                        <MdCancel className="cursor-pointer " onClick={()=>removeHandler(oneTag)}/>
                    </div>
                ))
            }
          </div>
          <input
            placeholder="Enter Tag And Press Enter Or Comma"
            type="text"
            name="tag"
            value={inputFieldValue}
            onInput={changeHandler}
            onKeyDown={pressHandler}
            className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
            }}
          />
        </label>
  )
}
