import React from 'react'

export const PlatformData = () => {
    const data = [
        {
            Number:"5K",
            Type:"Active Students"
        },
        {
            Number:"10+",
            Type:"Mentors"
        },
        {
            Number:"200+",
            Type:"Courses"
        },
        {
            Number:"50+",
            Type:"Awards"
        },
    ]
  return (
    <div className='flex flex-row justify-around py-10 font-thin'>
    {
       data.map((element,index)=>(
           <div className='flex flex-col text-center items-center' key={index}>
           <div className='font-semibold text-xl md:text-3xl text-richblack-5'>{element.Number}</div>
           <div className=' font-semibold text-sm md:text-base text-richblack-200'>{element.Type}</div>
           </div>
       ))
    }
    </div>
  )
}
