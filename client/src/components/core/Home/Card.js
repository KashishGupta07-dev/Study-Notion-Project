import React from 'react';
import { ImTree } from "react-icons/im";
import { HiUsers } from "react-icons/hi";
export default function Card({course ,onClick,backgroundColor,shadow,headingColor,subheadingColor,bottomTextColor}) {
  return (
    <div className={`lg:mx-0 mx-auto cursor-pointer flex flex-col gap-4 text-md font-light h-[300px] w-[350px] ${subheadingColor} ${shadow?" shadow-[10px_10px] shadow-yellow-50":" shadow-none"} ${backgroundColor} justify-between`}>
    <div className='border-b-2 border-dashed h-[80%] w-[100%]' onClick={onClick}>
    <div className='flex flex-col gap-6 mt-6 px-6'>
        <div className={`${headingColor} font-bold text-xl`}>{course.heading}</div>
        <div>{course.description}</div>
    </div>
    </div>
    <div className={`flex flex-row justify-between font-semibold mb-6 px-6 ${bottomTextColor}`}>
    <div className='flex flex-row items-center gap-2'>
    <HiUsers/>
    <div>{course.level}</div>
    </div>
    <div className='flex flex-row items-center gap-2'>
    <ImTree/>
    <div>{`${course.lessionNumber} lessons` }</div>
    </div>
    </div>
    </div>
  )
}
