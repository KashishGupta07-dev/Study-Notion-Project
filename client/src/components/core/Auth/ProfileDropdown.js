import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState,useEffect,useRef } from 'react';
import { logoutHandler } from '../../../services/operations/authApi';
export const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.profile);
  const [showDropdown,setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [dropdownRef]);

  return (
    <div className='relative' ref={dropdownRef}>
    <img src={user?.image}  className='rounded-full w-10 aspect-square  cursor-pointer' alt='user' onClick={()=>setShowDropdown(!showDropdown)}/>
    <div className={`absolute left-[-340%] top-[140%] items-start opacity-0 flex flex-col gap-4 cursor-pointer z-[4] rounded-lg bg-richblack-200 p-3 ${showDropdown?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}`}>
    <div className=' pl-2 pr-20 hover:bg-richblack-500 hover:text-white rounded-lg py-4 font-medium' onClick={()=>{navigate("/dashboard/my-profile");
    setShowDropdown(false)}} >
      Dashboard
    </div>
    <div className=' pl-2 pr-20 w-full hover:bg-richblack-500 hover:text-white rounded-lg py-4 font-medium' onClick={()=>{dispatch(logoutHandler(navigate));
    setShowDropdown(false)}} >
      Logout
    </div>
    </div>
    <div className={`absolute left-[20%] top-[120%] w-6 h-6 rotate-45 opacity-0  bg-richblack-200 ${showDropdown?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}`}></div>
    </div>
  )
}
