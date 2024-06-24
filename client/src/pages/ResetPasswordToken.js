import React from 'react'
import { useNavigate } from 'react-router'
import { GoArrowLeft } from 'react-icons/go';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generateResetPasswordToken } from '../services/operations/authApi';
export const ResetPasswordToken = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mailSent,setMailSent] = useState(false);
    const [formData,setFormData] = useState({
        email:"",
    });
    function changeHandler(event){
        setFormData((prevState)=>({
            ...prevState,
            [event.target.name] : event.target.value,
        }))
    }
    
    async function formSubmitHandler(event){
        event.preventDefault();
        dispatch(generateResetPasswordToken(formData?.email,navigate,setMailSent));
    }
  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col w-[38%] my-auto max-w-maxContent mx-auto justify-center items-start'>
    <div className=' flex flex-col mt-6 gap-4'>
    <div className='text-richblack-5 text-3xl font-medium'>{
        mailSent?"Check Email":"Reset your password"
        }</div>
    <div className=' tracking-wider text-lg text-richblack-100'>
    {
        mailSent?`We have sent the reset email to ${formData?.email} `:
   "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
    }
    </div>
    </div>
    {
        !mailSent && (
    <label>
    <p className='mb-1 mt-6 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Email Address<sup className='text-pink-400'>*</sup></p>
    <input placeholder='Enter Email Address' type='email' onChange={changeHandler} name='email' value={formData.email} className='bg-richblack-700 rounded-md px-4 py-3 w-[470px] text-richblack-5 placeholder-richblack-200 outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }}/>
    </label>
        )
    }
    <input type="submit" value={`${mailSent?"Resend Email":"Submit"}`} className='w-full cursor-pointer mt-6 bg-yellow-50 text-black rounded-md py-3 font-bold'/>
    <div className='flex flex-row gap-2  items-center cursor-pointer text-richblack-25 mt-3 text-[17px] font-medium' onClick={()=>{navigate("/login")}}>
                    <GoArrowLeft/>
                    <div>Back To Login</div>
    </div>
</form>
  )
}
