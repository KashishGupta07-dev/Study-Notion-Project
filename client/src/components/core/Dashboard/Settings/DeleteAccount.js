import React from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteProfile } from '../../../../services/operations/profileApi';
export const DeleteAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  function clickHandler(){
      dispatch(deleteProfile(token,navigate));
  }
  return (
    <div className='w-full mb-16 flex flex-row border-[1px] border-pink-700 bg-pink-900 py-8 px-10 rounded-md gap-8 items-center'>
    <div className='px-3 py-3 aspect-square rounded-full bg-pink-500'>
    <MdDelete className=' text-yellow-25 object-cover size-10'/>
    </div>
    <div className='flex flex-col gap-3'>
    <div className='sm:text-lg text-base font-semibold text-richblack-5'>Delete Account</div>
    <div className='text-sm sm:text-base lg:w-[46%] font-medium text-richblack-200'>Would you like to delete account?This account may contain Paid Courses.Deleting your account is permanent and will remove all the contain associated with it.</div>
    <button className='text-pink-300 italic w-fit text-sm sm:text-base' onClick={clickHandler}>I Want To Delete My Account</button>
    </div>
    </div>
  )
}
