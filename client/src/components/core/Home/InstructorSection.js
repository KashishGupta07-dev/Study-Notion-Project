import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
export default function InstructorSection() {
  return (
    <div className=' flex lg:flex-row flex-col  w-[90%] items-center gap-24 max-w-maxContent mt-20'>
    <div className='lg:w-fit lg:h-fit w-fit shadow-[-15px_-15px] shadow-white'>
        <img src={Instructor} alt='Instructor' className='lg:h-[450px] object-cover'/>
        </div>
        <div className='flex flex-col lg:w-[500px] gap-10 '>
            <div className='text-center lg:text-start text-4xl font-semibold text-richblack-5'>Become an <HighlightText text={"instructor"}/></div>
            <div className=' font-medium text-[16px] tracking-wider text-richblack-300 lg:text-start text-center'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
        </div>
    </div>
  )
}
