import React from 'react'
import Frame from "../../../assets/Images/frame.png";
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

export default function Template({heading,subHeading,subHeadingOther,signup,Image}) {
  return (
    <div className='mx-auto relative flex lg:flex-row flex-col-reverse mt-12 w-11/12 max-w-maxContent gap-28 lg:gap-40 items-center lg:justify-center lg:items-start'>
        <div className='flex flex-col mt-4 lg:w-[40%] gap-4'>
            <div className='text-richblack-5 font-semibold text-3xl '>{heading}</div>
            <div className='text-richblack-100 text-lg'>{subHeading} <br></br><span className='font-edu-sa font-bold italic text-blue-100 text-sm'>{subHeadingOther}</span></div>
           {
            signup?<SignupForm/>:<LoginForm/>
           } 
        </div>
        <div className='relative'>
            <img src={Image} alt='signup' className='lg:h-[400px] relative z-10' loading="lazy"/>
            <img src={Frame} alt='frame' className='absolute top-5 left-[5%] lg:h-[400px]' loading="lazy"/>
        </div>
    </div>
  )
}
