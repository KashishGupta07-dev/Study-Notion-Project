import React from 'react'

export const Modal = ({heading,subheading,firstBtnText,firstBtnClickHandler,secondBtnText,secondBtnClickHandler}) => {
  return (
    <div className='fixed w-full left-0 bottom-0 right-0 top-0 h-full bg-opacity-10 backdrop-blur-sm flex items-center justify-center bg-white'>
        <div className='w-fit max-w-[350px] flex flex-col border-[0.5px] rounded-md pl-5 pr-6 py-4 border-pure-greys-100 gap-4 bg-richblack-900'>
            <div className='text-2xl font-semibold text-richblack-5'>{heading}</div>
            <div className='text-richblack-200 text-base'>{subheading}</div>
            <div className='flex flex-row gap-7'>
                <button className='bg-yellow-50 text-black px-6 rounded-md py-2 font-semibold' onClick={firstBtnClickHandler}>
                    {firstBtnText}
                </button>
                <button className='bg-richblack-200 text-black px-6 rounded-md py-2 font-semibold' onClick={secondBtnClickHandler}>
                    {secondBtnText}
                </button>
            </div>
        </div>
    </div>
  )
}
