import React from 'react';
import { useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/operations/authApi';
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [eyePass,setEyePass]=useState(true);
const [formData,setFormData] = useState({
  email:"",
  password:""
});
function changeHandler(event){
  setFormData({
    ...formData,
    [event.target.name]:event.target.value,
  })
}
  function submitHandler(event){
    event.preventDefault();
    dispatch(loginUser(formData?.email,formData?.password,navigate))
  }
  return (
    <form className='flex flex-col gap-8 mb-10  lg:w-full' onSubmit={submitHandler}>
    <label className='w-full'>
    <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Email Address<sup className='text-pink-400'>*</sup></p>
    <input placeholder='Enter Email Address' name='email' onChange={changeHandler} value={formData.email} type='email' className='bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }}/>
    </label>
    <label className='relative w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Password <sup className='text-pink-400'>*</sup></p>
        <div className='flex flex-row'>
    <input placeholder='Enter Password' type={`${eyePass?"password":"text"}`} name='password' onChange={changeHandler} value={formData.password} className=' w-full bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 outline-none' required style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset",

            }}/>
        {
          eyePass?  <IoEyeOutline className=' cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyePass(!eyePass)}/>:
          <IoEyeOffOutline className='cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200' size={"25px"} onClick={()=>setEyePass(!eyePass)}/>
            }
            </div>
    </label>
    <Link to={"/reset-password"}>
            <div className='text-[12px]  -translate-y-[60%] text-blue-100 text-end '>Forgot Passoword</div>
    </Link>
    <input type="submit" value={"Sign In"} className='w-full mt-6 bg-yellow-50 rounded-md py-2 font-bold cursor-pointer'/>
    </form>
  )
}
