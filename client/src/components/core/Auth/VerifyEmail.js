import React, { useEffect } from 'react'
import OTPInput from 'react-otp-input'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { GoArrowLeft } from "react-icons/go";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, signupUser } from '../../../services/operations/authApi';
import { setSignupData } from '../../../reducers/slices/AuthSlice';
export default function VerifyEmail() {
    const [otp,setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {signupData} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[navigate,signupData]);
    function submitHandler(event){
        event.preventDefault();
        dispatch(setSignupData({
            ...signupData
        }))
        dispatch(signupUser(signupData?.firstName,signupData?.lastName,signupData?.email,signupData?.password,signupData?.confirmPassword,signupData?.accountType,otp,navigate));
    }
  return (
    <form className='flex flex-col mx-auto w-11/12 sm:w-[60%]  lg:w-[45%] max-w-maxContent gap-4 mt-20' onSubmit={submitHandler}>
            <div className='text-richblack-5 text-3xl font-semibold'>Verify Email</div>
            <div className='text-richblack-200 text-xl'>
            A verification code has been sent to you. Enter the code below
            </div>
            <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} placeholder='-'  className='bg-richblack-800 mr-3 sm:mr-5 w-[16.67%] aspect-square outline-none text-center text-lg  placeholder-richblack-400  text-richblack-5 rounded-md' style={
                {
                    boxShadow:"rgba(255, 255, 255, 0.18) 0px -1px 0px inset"
                }
            }/>}
            />
            <input type='submit' value='Verify Email' className=' w-full sm:w-[97%] bg-yellow-100 rounded-md py-3 mx-auto mt-5 sm:mt-8 cursor-pointer font-semibold'/>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-2 items-center cursor-pointer text-richblack-25 mt-2 text-[17px] font-medium' onClick={()=>{navigate("/signup")}}>
                    <GoArrowLeft/>
                    <div>Back To Signup</div>
                </div>
                <div className='flex flex-row gap-2 items-center cursor-pointer text-blue-100 text-[17px] mt-2 font-medium' onClick={()=>dispatch(sendOtp(signupData?.email,navigate))}>
                    <FaArrowRotateLeft/>
                    <div>Resend it</div>
                </div>
            </div>
            <div></div>
    </form>
  )
}
