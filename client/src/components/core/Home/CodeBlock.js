import React from 'react'
import CtaButton from './CtaButton'
import { TypeAnimation } from 'react-type-animation'
import GradientBall from './GradientBall'
export default function CodeBlock({heading,subHeading,button1,button2,code,flexDirection,codeColor,from,via,to}) {
    return (
    <div className={`lg:flex lg:${flexDirection==="flex-row"?"flex-row" : " flex-row-reverse"} justify-between w-[100%]`}>
        <div className='lg:w-[45%] flex flex-col gap-4'>
            <div className='text-4xl font-semibold'>{heading}</div>
            <div className='text-richblack-200 text-lg font-semibold'>{subHeading}</div>
            <div className='flex flex-row gap-8 lg:text-base text-sm'>
                <CtaButton text={button1.text} linkto={button1.linkto} active={button1.active}/>
                <CtaButton text={button2.text} linkto={button2.linkto} active={button2.active}/>
            </div>
        </div>


        <div className='select-none text-sm z-10 lg:w-[40%] lg:mt-0 mt-8   max-h-max relative flex flex-row font-bold bg-richblack-800 bg-opacity-50 gap-4 border-[2px] border-richblack-400 py-4 px-3'>
        {
           !from&&!via&&!to?<div className={`z-[-1] absolute blur-[34px] w-[350px] h-[280px] opacity-20 -top-10 rounded-full bg-gradient-to-tr from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF]`}></div> : <GradientBall from={`${from}`} via={`${via}`} to={`${to}`}/>
        }
        <div className='text-center flex flex-col gap-2 mt-[4px] text-richblack-500'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className={`${codeColor}`}>
            <TypeAnimation
                sequence={["",code,1000]}
                cursor={true}
                omitDeletionAnimation={true}
                style={
                    {
                        whiteSpace: 'pre-line',
                        display:"inline-block",
                        lineHeight:"28px"
                    }
                }
                repeat={Infinity}
            />
            </div>
        </div>
    </div>
  )
}
