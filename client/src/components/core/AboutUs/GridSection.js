import React from 'react'
import HighlightText from "../Home/HighlightText"
import CtaButton from "../Home/CtaButton"
export default function GridSection() {
    const LearningGridArray = [
        {
          order: -1,
          heading: "World-Class Learning for",
          highlightText: "Anyone, Anywhere",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
          BtnText: "Learn More",
          BtnLink: "/",
        },
        {
          order: 1,
          heading: "Curriculum Based on Industry Needs",
          description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
          order: 2,
          heading: "Our Learning Methods",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 3,
          heading: "Certification",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 4,
          heading: `Rating "Auto-grading"`,
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
          order: 5,
          heading: "Ready to Work",
          description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
      ];
  return (
    <div className='flex flex-col mx-auto lg:gap-0 lg:grid lg:grid-cols-4 lg:w-full w-11/12 mt-24'>
      {
        LearningGridArray.map((data,index)=>(
            <div className={`flex flex-col h-[250px] ${data.order%2===0? "bg-richblack-800" : data.order===-1?"bg-transparent h-[400px] md:h-[270px] lg:h-[250px]":"bg-richblack-700"} ${index===3?"col-start-2":""} ${data.order===-1?"col-span-2":" col-span-1"}`} key={index}>
               <div className={`text-richblack-5 ${data.order===-1?"text-3xl font-semibold":"w-[70%] ml-6 mt-10 mb-10"}`}>{data.heading}</div>
               {
                data.order===-1 && (<div className=" text-3xl font-semibold">
                    <HighlightText text={data.highlightText}/>
                    </div>
                    )
               }
               <div className={`text-richblack-200 ${data.order===-1?"w-[90%]":"w-[70%] ml-6 text-sm"} `}>{data.description}</div>
               {
                data.order===-1 && (<CtaButton text={data.BtnText} linkto={data.BtnLink} active={true}/>
                    )
               }
            </div>
        ))
      }
    </div>
  )
}
