import React from 'react';
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineLogo from "../../../assets/Images/TimelineImage.png";
export default function TimeLineSection() {
    const data = [
        {
            Logo:Logo1,
            title:"Leadership",
            desc:"Fully committed to the success company",
        },
        {
            Logo:Logo2,
            title:"Responsibility",
            desc:"Students will always be our top priority",
        },
        {
            Logo:Logo3,
            title:"Flexibility",
            desc:"The ability to switch is an important skills",
        },
        {
            Logo:Logo4,
            title:"Solve the problem",
            desc:"Code your way to a solution",
        },
        
    ]
  return (
    <div className='w-[90%] flex lg:flex-row lg:justify-center lg:mx-0 flex-col lg:gap-40 gap-28 mt-28 max-w-maxContent'>
    <div className='relative w-full flex flex-col gap-2'>
        {
            data.map((element,index)=>{
                return(
                    <div className='flex flex-row items-start gap-10 md:gap-32 lg:gap-10' key={index}>
                    <div className=' flex flex-col gap-2 items-center'>
                    <div className='w-[52px] h-[52px] md:w-[80px] md:h-[80px] lg:w-[52px] lg:h-[52px] flex flex-col justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0] bg-white rounded-full'>
                    <img src={element.Logo} className=' object-cover' alt='logos'/>
                    </div>
                    {
                        index!==3?<div className='w-[1px] h-10 bg-richblack-300'></div>:<></>
                    }
                    </div>
                    <div>
                        <div className="text-lg md:text-2xl lg:text-lg font-semibold">{element.title}</div>
                        <div className='md:text-lg lg:text-base tectfont-light'>{element.desc}</div>
                    </div>
                    </div>
                );
            })
        }
    </div>
    <div className='relative shadow-[0px_0px_30px_0px] shadow-blue-50 w-fit max-w-[90%] lg:w-full h-fit mx-auto'>
        <div className='shadow-[17px_17px_0px_0px] shadow-white w-full lg:w-full'>
            <img src={TimeLineLogo} className=' object-cover' alt='Time Line Logo'/>
        </div>
        <div className='absolute bg-caribbeangreen-700 lg:top-[50%] lg:translate-y-[100%] lg:left-[50%] lg:-translate-x-[51%] top-0'>
            <div className=' lg:py-12 py-4 items-center flex lg:flex-row flex-col gap-5'>
                <div className='flex flex-row gap-8 lg:border-r-[1px] lg:pl-8 lg:pr-10 px-8 lg:border-caribbeangreen-300'>
                    <div className=' font-bold text-white lg:text-3xl text-2xl'>10</div>
                    <div className='font-light text-caribbeangreen-300 text-sm w-[75px]'>YEARS EXPERIENCES</div>
                </div>
                    <div>
                    <div className='flex flex-row gap-6 lg:pl-8 lg:pr-10 px-8 border-caribbeangreen-300'>
                    <div className=' font-bold text-white lg:text-3xl text-2xl'>250</div>
                    <div className='font-light text-caribbeangreen-300 text-sm w-[75px]'>TYPES OF COURSES</div>
                </div>
                    </div>
            </div>
        </div>  
    </div>
    </div>
  )
}
