import React from 'react'
import { useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { sendOtp } from '../../../services/operations/authApi';
import { useNavigate } from 'react-router';
import { setSignupData } from '../../../reducers/slices/AuthSlice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
export default function SignupForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [eyePass,setEyePass]=useState(true);
    const [eyeConfirmPass,setEyeConfirmPass]=useState(true);
    const [user,setUser] = useState("Student");
    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        accountType:user,
    })
    function clickHandler(value){
        setUser(value);
        setFormData((prevState)=>({
            ...prevState,
            accountType:value,
        }))
    }
    function changeHandler(event){
        setFormData((prevState)=>({
            ...prevState,
            [event.target.name] : event.target.value,
        }))
    }
    async function formSubmitHandler(event){
        event.preventDefault();
        if(formData.password!==formData.confirmPassword){
            toast.error("Password And Confirm Password Not Match");
            navigate("/signup");
            setUser("Student");
            setFormData({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        accountType:user,
        })
            return;
        }
        dispatch(setSignupData(formData));
        dispatch(sendOtp(formData?.email,navigate));
        setUser("Student");
        setFormData({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        accountType:user,
        })
    }
  return (
    <form className='flex flex-col gap-8 mb-10 text-white lg:w-full' onSubmit={formSubmitHandler}>
    <div className='flex flex-row items-center p-1 transition-all duration-300 mt-6 gap-8 bg-richblack-800 w-fit rounded-full' style={
                {
                    boxShadow:"rgba(255, 255, 255, 0.18) 0px -1px 0px inset"
                }}>
            <div className={`py-2 cursor-pointer px-5 hover:bg-richblack-900 hover:text-richblack-5 ${user==="Student"?"bg-richblack-900 text-richblack-5":"text-richblack-200"} rounded-full`} onClick={()=>{clickHandler("Student")}}>Student</div>
            <div  className={`py-2 cursor-pointer px-5 hover:bg-richblack-900 hover:text-richblack-5 ${user==="Instructor"?"bg-richblack-900 text-richblack-5":"text-richblack-200"} rounded-full`} onClick={()=>{clickHandler("Instructor")}}>Instructor</div>
        </div>
    <div className='flex flex-row gap-4'>
    <label className='w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>First Name <sup className='text-pink-400'>*</sup></p>
    <input placeholder='Enter First Name' type='text' onChange={changeHandler} name='firstName' value={formData.firstName} className='bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }}/>
    </label>
    <label className='w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Last Name <sup className='text-pink-400'>*</sup></p>
    <input placeholder='Enter Last Name' type='text' onChange={changeHandler} name='lastName' value={formData.lastName} className='bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }}/>
    </label>
    </div>
    <label>
    <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Email Address<sup className='text-pink-400'>*</sup></p>
    <input placeholder='Enter Email Address' type='email' onChange={changeHandler} name='email' value={formData.email} className='bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }}/>
    </label>
    <div className='flex flex-row  gap-4'>
    <label className='relative w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Password <sup className='text-pink-400'>*</sup></p>
        <div className='flex flex-row'>
    <input placeholder='Enter Password' onChange={changeHandler} name='password' value={formData.password} type={`${eyePass?"password":"text"}`} className=' bg-richblack-700 rounded-md pl-4 pr-14 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset",

            }}/>
        {
          eyePass?  <IoEyeOutline className=' cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyePass(!eyePass)}/>:
          <IoEyeOffOutline className='cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyePass(!eyePass)}/>
            }
            </div>
    </label>
    <label className='relative w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Confirm Password <sup className='text-pink-400'>*</sup></p>
    <div className='flex flex-row'>
    <input placeholder='Confirm Password' onChange={changeHandler} name='confirmPassword' value={formData.confirmPassword} type={`${eyeConfirmPass?"password":"text"}`} className=' bg-richblack-700 rounded-md pl-4 pr-14 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset",

            }}/>
        {
          eyeConfirmPass?  <IoEyeOutline className=' cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyeConfirmPass(!eyeConfirmPass)}/>:
          <IoEyeOffOutline className='cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyeConfirmPass(!eyeConfirmPass)}/>
            }
            </div>
    </label>
    </div>
    <input type="submit" value={"Create Account"} className='w-full cursor-pointer bg-yellow-50 text-black rounded-md py-2 font-bold'/>
    </form>
  )
}
