import React from 'react'
import { IoIosChatboxes } from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ContactForm } from '../components/core/common/ContactForm';
import Footer from "../components/core/Home/Footer";
import ReviewSection from '../components/core/Home/ReviewSection';
export const ContactUs = () => {
  return (
    <div>
    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col lg:flex-row items-center lg:gap-36 pb-16 lg:items-baseline'>
        <div className='flex flex-col bg-richblack-800 rounded-lg px-8 py-11 gap-10 pr-28 h-fit w-full lg:w-fit mt-16 lg:mt-0'>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center text-lg text-richblack-5 font-semibold gap-2'>
               <IoIosChatboxes size={"25px"}/>
               <div>Chat On Us</div>
            </div>
            <div className='text-richblack-200 text-sm'>Our friendly team is here to help.<br></br><span className='font-semibold'>Email Id:doraemonop@gmail.com</span></div>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center text-lg text-richblack-5 font-semibold gap-2'>
               <FaEarthAsia size={"20px"}/>
               <div>Visit us</div>
            </div>
            <div className='text-richblack-200 text-sm'>Come and say hello at our office HQ.<br></br><span className='font-semibold'>Address:Ghar</span></div>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center text-lg text-richblack-5 font-semibold gap-2'>
               <BsFillTelephoneFill size={"20px"}/>
               <div>Call Us</div>
            </div>
            <div className='text-richblack-200 text-sm'>Mon - Fri From 8am to 5pm<br></br><span className='font-semibold'>Contact Number : Naughty horha</span></div>
          </div>
        </div>
        <ContactForm heading={"Got a Idea? We've got the skills. Let's team up"} subheading={"Tell us more about yourself and what you're got in mind."} ctaText={"Send Message"} border={true}/>
    </div>
    <section className='w-11/12 max-w-maxContent mx-auto'>
          <ReviewSection/>
     </section>
    <Footer/>
    </div>
  )
}
