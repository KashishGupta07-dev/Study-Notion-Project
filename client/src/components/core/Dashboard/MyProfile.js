import React from 'react'
import { useSelector } from 'react-redux'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router';

export const MyProfile = () => {
  const {user} = useSelector((state)=>state.profile);
  const navigate = useNavigate();
  return (
    <div className=' h-[calc(100vh-3.5rem)] overflow-auto'>
    <div className='w-11/12 flex flex-col mx-auto gap-5'>
      <div className='text-richblack-5 text-3xl font-medium mt-14'>My Profile</div>
      <section className='w-full bg-richblack-800 py-8 px-10 mt-8 rounded-md border-[1px] border-richblack-700 flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-3 items-center'>
        <img src={user?.image} alt='User' className='rounded-full w-24 aspect-square'/>
          <div className=' flex flex-col gap-2'>
            <div className='text-richblack-5 text-lg font-medium'>{`${user?.firstName} ${user?.lastName}`}</div>
            <div className='text-richblack-200 text-sm'>{user?.email}</div>
          </div>
        </div>
        <button className='flex flex-row items-center gap-3 bg-yellow-50 h-[50%] py-2 px-4 rounded-md' onClick={()=>navigate("/dashboard/settings")}>
            <div>Edit</div>
            <FaEdit />
        </button>
      </section>


      <section className='w-full bg-richblack-800 py-8 px-10 mt-8 rounded-md border-[1px] border-richblack-700 flex flex-row justify-between items-baseline'>
        <div className='flex flex-col gap-12'>
          <div className='text-richblack-5 text-xl font-semibold'>About</div>
          {
            user?.additionalDetails?.about ? <div className='text-sm text-richblack-200'>{user?.additionalDetails?.about}</div> :<div className='text-sm text-richblack-200'>Write Something About Yourself</div>
          }
        </div>
        <button className='flex flex-row items-center gap-3 bg-yellow-50 h-[50%] py-2 px-4 rounded-md' onClick={()=>navigate("/dashboard/settings")}>
            <div>Edit</div>
            <FaEdit />
        </button>
      </section>


      <section className='w-full bg-richblack-800 py-8 px-10 mt-8 rounded-md border-[1px] border-richblack-700 flex flex-row justify-between items-baseline mb-16'>
        <div className='flex flex-col gap-12 w-full'>
        <div className='flex justify-between'>
          <div className='text-richblack-5 text-xl font-semibold'>Personal Details</div>
          <button className='flex flex-row items-center gap-3 bg-yellow-50 h-[50%] py-2 px-4 rounded-md' onClick={()=>navigate("/dashboard/settings")}>
            <div>Edit</div>
            <FaEdit />
        </button>
        </div>
         <div className='flex flex-col w-[500px] gap-4'>
            <div className='flex flex-row text-richblack-200 gap-72'>
              <div className='flex flex-col gap-2'>
              <div>First Name</div>
              <div className='text-richblack-5 text-sm'>{user?.firstName}</div>
              </div>
              <div className='flex flex-col gap-2'>
              <div>Last Name</div>
              <div className='text-richblack-5 text-sm'>{user?.lastName}</div>
              </div>
            </div>
            <div className='flex flex-row text-richblack-200 justify-between'>
              <div className='flex flex-col gap-2'>
              <div>Email</div>
              <div className='text-richblack-5 text-sm'>{user?.email}</div>
              </div>
              <div className='flex flex-col gap-2'>
              <div>Phone Number</div>
              <div className='text-richblack-5 text-sm'>{
                user?.additionalDetails?.contactNumber?user?.additionalDetails?.contactNumber:"Add Contact Number"
                }</div>
              </div>
            </div>
            <div className='flex flex-row text-richblack-200 justify-between'>
              <div className='flex flex-col gap-2'>
              <div>Gender</div>
              <div className='text-richblack-5 text-sm'>{user?.additionalDetails?.gender?user?.additionalDetails?.gender:"Add Gender"}</div>
              </div>
              <div className='flex flex-col gap-2'>
              <div>Date Of Birth</div>
              <div className='text-richblack-5 text-sm'>{
                user?.additionalDetails?.dateOfBirth?user?.additionalDetails?.dateOfBirth:"Add Contact Number"
                }</div>
              </div>
            </div>
         </div>
        </div>
      </section>
      </div>
    </div>
  )
}
