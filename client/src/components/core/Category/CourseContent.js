import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
export const CourseContent = ({course}) => {
    function totalLectures(){
        let totalLectures = 0;
        for(const key in course?.courseContent){
            totalLectures+=course?.courseContent[key]?.subSection.length;
        } 
        return totalLectures;
    }
    function totalTimeDuration(){
        let timeDuration = 0;
        for(const key in course?.courseContent){
            for(const time in course?.courseContent[key]?.subSection){
                timeDuration += Number(course?.courseContent[key]?.subSection[time]?.timeDuration);
            }
        }
        timeDuration = Math.round(timeDuration);
        const seconds = timeDuration%60;
        const hours = Math.floor((timeDuration/60)/60);
        const minutes = (Math.floor(timeDuration/60))%60;
        return [hours,minutes,seconds] ;
    }
    function handleChange(sectionId){
        const mainClass = document.getElementsByClassName(sectionId);
        const arrow = mainClass[0].getElementsByClassName("arrow");
        const expansion = mainClass[0].getElementsByClassName("expansion");
        arrow[0].classList.toggle("rotate");
        if(expansion.length>0){
            if(String(expansion[0].classList?.value).split(" ").includes("heightAndDisplayManager")){
                expansion[0].style.maxHeight = 0 + "px"; 
            }
            else{
                expansion[0].style.maxHeight = expansion[0].scrollHeight + "px";
            }
        expansion[0].classList.toggle("heightAndDisplayManager");
        }
    }
  return (
    <div className='flex flex-col gap-y-3 max-w-[60%]'>
        <div className='text-richblack-5 text-3xl font-bold mt-8'>Course Content</div>
        <div className='flex flex-row text-richblack-5 text-base font-medium justify-between'>
        <div className='flex flex-row gap-x-4'>
        <div>{`${course?.courseContent?.length} Section(s)`}</div>
            <div>{`${totalLectures()} Lecture(s)`}</div>
            <div>{`${totalTimeDuration()[0]}h ${totalTimeDuration()[1]}m ${totalTimeDuration()[2]}s total length`}</div>
        </div>
            <button className='bg-transparent text-yellow-50 text-base' onClick={()=>{
                const element1 = document.getElementsByClassName("arrow");
                const element2 = document.getElementsByClassName("expansion");
                for(const arrow in element1){
                    if(element1[arrow].classList?.value && String(element1[arrow].classList?.value).split(" ").includes("rotate")){
                        element1[arrow].classList.remove("rotate");
                    }
                }
                for(const expand in element2){
                    if(element2[expand].classList?.value && String(element2[expand].classList?.value).split(" ").includes("heightAndDisplayManager")){
                        element2[expand].classList.remove("heightAndDisplayManager");
                        element2[expand].style.maxHeight = 0 + "px"; 
                    }
                }
            }}>Collapse All Section</button>
        </div>
        <div className='w-full'>
            {
                course?.courseContent.map((section)=>(
                    <div className={`${section._id} border-[1px] border-richblack-300  text-richblack-5`} key={section._id}>
                    <div className={` flex flex-row items-center px-7 py-6 justify-between cursor-pointer bg-richblack-700 `} onClick={()=>handleChange(section._id)}>
                        <div className='flex flex-row items-center gap-x-4'>
                        <div>
                            <MdKeyboardArrowDown size={"22px"} className='arrow transition-all duration-500'/>
                        </div>
                        <div>{section?.sectionName}</div>
                        </div>
                        <div className='text-yellow-50'>{`${section?.subSection?.length} lecture(s)`}</div>
                    </div>
                    <div className={`${section?.subSection?.length>0 ? "expansion overflow-y-hidden" : "overflow-y-hidden" } bg-opacity-20  transition-all duration-500 max-h-0 opacity-0`}>
                    <div className= {` px-7 py-6`}>
                    {
                        section?.subSection &&  section?.subSection?.length>0 && section?.subSection?.map((subSection)=>(
                        <div className='flex flex-row justify-between' key={subSection._id}>
                        <div className='text-yellow-50 items-center flex flex-row gap-x-4'>
                            <FaVideo/>
                            <div className='font-bold'>{subSection?.title}</div>
                        </div>
                        <div className='text-richblack-5 font-bold'>{`${Math.round(subSection?.timeDuration)}s`}</div>
                    </div>
                        ))
                    }
                    </div>
                    </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
