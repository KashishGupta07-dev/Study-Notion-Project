import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { GoArrowLeft } from 'react-icons/go';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {resetPasswordFromToken } from '../services/operations/authApi';
import toast from 'react-hot-toast';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

export const ResetPassword = () => {
  const {isResetTokenGenerated} = useSelector((state)=>state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.pathname.split("/").at(-1);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!isResetTokenGenerated){
      navigate("/reset-password");
    }
  },[isResetTokenGenerated,navigate])
  const [eyePass,setEyePass]=useState(true);
  const [eyeConfirmPass,setEyeConfirmPass]=useState(true);
  const [formData,setFormData] = useState({
     password:"",
     confirmPassword:"",
  });
  function changeHandler(event){
      setFormData((prevState)=>({
          ...prevState,
          [event.target.name] : event.target.value,
      }))
  }
  
  async function formSubmitHandler(event){
      event.preventDefault();
      if(formData?.password !== formData?.confirmPassword){
        toast.error("Password And Confirm Passoword Not Match")
        navigate("/login")
        return;
      }
      dispatch(resetPasswordFromToken(formData?.password,formData?.confirmPassword,token,navigate));
  }
  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col w-[38%] my-auto max-w-maxContent mx-auto justify-center items-start'>
    <div className=' flex flex-col mt-6 gap-4'>
    <div className='text-richblack-5 text-3xl font-medium'>{
       "Choose New Password"
        }</div>
    <div className=' tracking-wider text-lg text-richblack-100'>
    {
        "Almost done. Enter your new password and youre all set."
    }
    </div>
    </div>
    <label className='relative mt-3'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Password <sup className='text-pink-400'>*</sup></p>
        <div className='flex flex-row'>
    <input placeholder='Enter Password' onChange={changeHandler} name='password' value={formData.password} type={`${eyePass?"password":"text"}`} className=' bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-[470px] outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset",

            }}/>
        {
          eyePass?  <IoEyeOutline className=' cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyePass(!eyePass)}/>:
          <IoEyeOffOutline className='cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyePass(!eyePass)}/>
            }
            </div>
    </label>
    <label className='relative mt-4'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Confirm Password <sup className='text-pink-400'>*</sup></p>
    <div className='flex flex-row'>
    <input placeholder='Confirm Password' onChange={changeHandler} name='confirmPassword' value={formData.confirmPassword} type={`${eyeConfirmPass?"password":"text"}`} className=' bg-richblack-700 w-[470px] rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset",

            }}/>
        {
          eyeConfirmPass?  <IoEyeOutline className=' cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyeConfirmPass(!eyeConfirmPass)}/>:
          <IoEyeOffOutline className='cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyeConfirmPass(!eyeConfirmPass)}/>
            }
            </div>
    </label>
    <input type="submit" value={"Reset Password"} className='w-full cursor-pointer mt-6 bg-yellow-50 text-black rounded-md py-3 font-bold'/>
    <div className='flex flex-row gap-2  items-center cursor-pointer text-richblack-25 mt-3 text-[17px] font-medium' onClick={()=>{navigate("/login")}}>
                    <GoArrowLeft/>
                    <div>Back To Login</div>
    </div>
</form>
  )
}
