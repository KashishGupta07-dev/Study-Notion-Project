import React from 'react'
import { Link } from 'react-router-dom'
export default function FooterLinks({title,links,isIndex}) {
  return (
    <div className='flex flex-row gap-0 lg:gap-5'>
    {
        isIndex?<div className='invisible lg:visible w-[0.1px] h-[600px] bg-richblack-600'>
        </div>:<></>
    }
    <div className='flex flex-col gap-3 text-sm text-richblack-400'>
        <div className='font-bold text-lg text-richblack-50'>{title}</div>
        {
            links.map((value,index)=>{
                return (
                    <div className='flex flex-col gap-3 h-fit' key={index}>
                        <Link to={value.link}>
                            <div className='hover:text-richblack-5'>{value.title}</div>
                        </Link>
                    </div>
                )
            })
        }
    </div>
    </div>
  )
}
