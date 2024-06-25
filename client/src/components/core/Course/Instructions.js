import React, { useEffect, useState,useRef } from 'react'
import { useSelector } from 'react-redux';
export const Instructions = ({register,setValue,getValues}) => {
    const [instructions,setInstructions] = useState([]);
    const [inputFieldValue,setInputFieldValue] = useState("");
    const {course,editCourse} = useSelector((state)=>state.course);
    const inputRef = useRef();
    useEffect(()=>{
      if(editCourse){
        setValue("instructions",(course?.instructions[0]).split(","));
        setInstructions((course?.instructions[0]).split(","));
      }
        register("instructions",{
          required: { value: true, message: "Please Enter Atleast One Instruction" },
        });
        // eslint-disable-next-line
    },[editCourse, course, register, setValue])
    useEffect(()=>{
        setValue("instructions",instructions);
        // eslint-disable-next-line
    },[instructions]);
    function pressHandler(event){
      event.preventDefault();
            if(instructions.some((i)=>i === inputRef.current.value.trim()) || inputRef.current.value.trim() === ""){ 
              setInputFieldValue("");
                return;
            }
            setInstructions([...instructions,inputRef.current.value]);
            setInputFieldValue("");
    }
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        pressHandler(event);
      }
    }
    function changeHandler(event){
        if(event.target.value===","){
            return;
        }
        setInputFieldValue(event.target.value);
    }
    function removeHandler(instruction){
        setInstructions(instructions=>instructions.filter((i)=>i !== instruction));
    }
  return (
    <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
            Requirements/Instructions <sup className="text-pink-400">*</sup>
          </p>
          <input
            placeholder="Enter Requirements And Press Add"
            type="text"
            name="instructions"
            value={inputFieldValue}
            onChange={changeHandler}
            onKeyDown={handleKeyPress}
            ref={inputRef}
            className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
            }}
          />
          <button className='text-yellow-50 mt-2' onClick={pressHandler}>Add</button>
          <div className='flex flex-col gap-y-2 mt-1'>
            {
                instructions.length>0 && instructions.map((instruction,index)=>(
                    <div className='flex flex-row gap-x-2 items-center  rounded-2xl  text-richblack-5 text-lg' key={index}>
                        <div>{instruction}</div>
                        <div className="cursor-pointer text-sm underline text-richblack-400" onClick={()=>removeHandler(instruction)}>cancel</div>
                    </div>
                ))
            }
          </div>
        </label>
  )
}
