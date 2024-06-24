import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CountryCodeJson from "../../../data/countrycode.json";
import { useDispatch } from 'react-redux';
import { sendContactUsForm } from '../../../services/operations/contactUsApi';
export const ContactForm = ({heading,subheading,ctaText,border}) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
      } = useForm();
      useEffect(()=>{
         reset({
            firstName:"",
            lastName:"",
            email:"",
            countryCode:"+91",
            phoneNumber:"",
            message:"",
         })
      },[reset,isSubmitSuccessful]);
      function submitHandler(data){
          dispatch(sendContactUsForm(data));
      }
  return (
    <div className={`flex flex-col gap-4 items-center mt-20 w-full lg:w-[470px] ${border?"border-[2px] border-richblack-200 rounded-lg lg:w-[600px] w-10/12 py-10":"border-none"} `}>
    <div className='text-4xl text-richblack-5 font-semibold  w-[85%] lg:w-[470px]'>{heading}</div>
    <div className='text-sm text-richblack-200  w-[85%] lg:w-[470px]'>{subheading}</div>
    
    <form className='mt-8 flex flex-col gap-10 mx-auto w-[86%] lg:w-[470px]' onSubmit={handleSubmit(submitHandler)}>
    <div className=' flex flex-col md:flex-row lg:gap-6 gap-10'>
    <label className='flex flex-col w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>First Name <sup className='text-pink-400'>*</sup></p>
    <input placeholder='Enter First Name' type='text' name='firstName' className='bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 w-full placeholder-richblack-200 outline-none'  style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }} {...register("firstName",{
                required:{value:true,message:"Please Enter First Name"},
                
            })}/>
            {errors.firstName && (
          <span className="mt-1 text-[12px] text-yellow-100">
            {errors.firstName.message}
          </span>
        )}
    </label>
    <label className='flex flex-col w-full'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Last Name </p>
    <input placeholder='Enter Last Name' type='text' name='lastName' className='bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none' style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }} {...register("lastName")}/>
    </label>
    </div>
    <label>
    <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Email Address<sup className='text-pink-400'>*</sup></p>
    <input placeholder='Enter Email Address' name='email' type='email' className='bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none'  style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }} {...register("email",{
                required:{value:true,message:"Please Enter Your Email Address"}
            })}/>
            {errors.email && (
          <span className="mt-1 text-[12px] text-yellow-100">
            {errors.email.message}
          </span>
        )}
    </label>
    <label className='flex flex-col'>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Phone Number<sup className='text-pink-400'>*</sup></p>
        <div className='flex flex-row gap-8'>
        <select defaultValue={"+91"} name='countryCode' className='w-[70px] px-2 outline-none bg-richblack-700 text-richblack-5  rounded-md'
        style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }} {...register("countryCode",{
                required:true,
            })}>
            {
                CountryCodeJson.map((element,index)=>(
                   <option value={element.code} key={index}>{`${element.code}  -  ${element.country}`}</option>
                ))
            }
        </select>
        <input placeholder='1234567890' type="number" className='bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none'  style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
            }} {...register("phoneNumber",{
                required:{value:true,message:"Enter Your Phone Number"},
                minLength:{value:8,message:"Please Enter Valid Phone Number"},
                maxLength:{value:10,message:"Please Enter Valid Phone Number"},
            })}/>
            
        </div>
        {(errors.countryCode || errors.phoneNumber) && (
          <span className="mt-1 text-[12px] text-yellow-100">
            {errors.phoneNumber.message}
          </span>
        )}
    </label>
    <label className='flex flex-col gap-2'>
    <p className='mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5'>Message<sup className='text-pink-400'>*</sup></p>
    <textarea name='message' placeholder='Enter Your Message Here' rows={"8"} cols={"53"} className='bg-richblack-700 outline-none rounded-md placeholder-richblack-200 text-richblack-5 px-3 py-3' 
        style={
            {
                boxShadow:"rgba(255, 255, 255, 0.3) 0px -2px 0px inset"
            }}
    {...register("message",{
        required:{value:true,message:"Please Enter Your Message"},
    })}/>
    {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.message.message}
          </span>
        )}
     <input type='submit' value={ctaText} className={`w-full mt-8 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]  py-2 cursor-pointer rounded-md font-bold bg-[#FFD60A] text-black hover:scale-95 hover:shadow-none transition-all duration-200`}/>
    </label>
    </form>
    </div>
  )
}
