import React from 'react'
import { Link } from 'react-router-dom'

export default function CtaButton({text,active,linkto}) {
  return (
    <Link to={linkto}>
    <div className={`w-fit mt-8 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] rounded-md font-bold ${active?"bg-[#FFD60A] text-black":"bg-richblack-800 text-white"} hover:scale-95 hover:shadow-none transition-all duration-200`}>
        <div className=' px-6 py-3'>{text}</div>
    </div>
    </Link>
  )
}
