import React from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from '../../../data/homepage-explore'
import { useState } from 'react';
import Card from './Card';
export default function CardSection() {
    const HomePageExploreData = HomePageExplore;
    const [currElement,setCurrElement] = useState(HomePageExplore[0].tag);
    const [courses,setCourses] = useState(HomePageExploreData[0].courses);
    const [currCourse,setCurrCourse] = useState(HomePageExploreData[0].courses[0])
    function clicHandlerBar(value){
        setCurrElement(value.tag);
        setCourses(value.courses);
        setCurrCourse(value.courses[0]);
    }
    function clickHandlerCourse(value){
        setCurrCourse(value);
    }
  return (
    <div className='relative flex flex-col items-center font-semibold mt-24 gap-2 lg:mb-52 mb-6 transition-all duration-200'>
    <div className='md:text-4xl text-3xl text-richblack-5 mx-auto font-bold '>Unlock the <HighlightText text="Power of Code"/></div>
    <div className='text-lg text-richblack-200 '>Learn to Build Anything You Can Imagine</div>
    <div className='flex flex-row lg:visible invisible  drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] items-center gap-8 bg-richblack-800 p-1 w-max rounded-full mt-4'>
        {
            HomePageExploreData.map((element,index)=>{
                return(
                    <div key={index} onClick={()=>clicHandlerBar(element)} className='font-[600] text-[16px] cursor-pointer text-richblack-200'>
                        {
                            currElement===element.tag?<div className='px-7 py-[7px] text-richblack-5 rounded-full bg-richblack-900'>{element.tag}</div> :
                            <div className='px-7 py-[7px] hover:text-richblack-5 rounded-full hover:bg-richblack-900'>{element.tag}</div>
                        }
                    </div>
                )
            })
        }
    </div>
    <div className='lg:absolute flex lg:flex-row flex-col lg:top-[50%] lg:translate-y-[50%] gap-10 w-[95%] max-w-maxContent'>
        {
            courses.map((element,index)=>{
                return(
                element===currCourse? 
                <Card onClick={()=>{clickHandlerCourse(element)}} course={element} backgroundColor={"bg-white"} headingColor={"text-black"} shadow={true} subheadingColor={"text-richblack-400"} bottomTextColor={"text-blue-300"} key={index}/>:
                <Card onClick={()=>clickHandlerCourse(element)} course={element} backgroundColor={"bg-richblack-800"} headingColor={"text-richblack-5"} shadow={false} subheadingColor={"text-richblack-400"} key={index} />
                )
            })
        }
    </div>
    </div>
  )
}
