import React from 'react'
import { HighlightTextByGradient } from '../common/HighlightTextByGradient'
import HighlightText from '../Home/HighlightText'

export const VisionMission = () => {
  return (
    <div className='flex md:flex-row md:justify-between mt-48 flex-col gap-20'>
        <div className='flex flex-col md:w-[40%] gap-16 text-center md:text-start'>
        <div className='text-4xl'>
           <HighlightTextByGradient text={"Our Vision"}/>
        </div>
        <div className='text-richblack-200 '>
        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
        </div>
        </div>
        <div className='flex flex-col md:w-[44%] gap-16 text-center md:text-start'>
        <div className='text-4xl'>
           <HighlightText text="Our Mission"/>
           </div>
        <div className='text-richblack-200 '>
        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
        </div>
        </div>
    </div>
  )
}
