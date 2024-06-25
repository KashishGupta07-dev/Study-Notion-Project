import { Rating } from "../common/Rating";
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setCart, setNumberOfItems} from "../../../../src/reducers/slices/CartSlice";
import { buyCourse } from "../../../services/operations/studentFeaturesApi";
import { useNavigate } from "react-router";
import { Spinner } from "../common/Spinner";
import { getAverageRating } from "../../../services/operations/averageRatingCalculator";
export const Cart = () => {
    const {cart,numberOfItems} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    function totalPrice(){
        let price = 0;
    for(const course in cart){
      price+=cart[course].price;
    }
    return price;
    }
    async function handleBuy(){
      setLoading(true);
      await buyCourse(cart.map(course=>course._id),token,user,navigate,dispatch);
      setLoading(false);
    }
  return (
    loading?<Spinner/>:
    <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
    <div className='w-11/12 mx-auto flex flex-col gap-y-10 mt-16'>
    <div className='text-richblack-5 font-semibold text-3xl'>Cart</div>
    <div className='text-richblack-200 font-semibold border-b-[0.5px] border-richblack-100 pb-3'>{`${numberOfItems} Courses in Cart`}</div>
    {numberOfItems === 0 ?<div className='w-fit text-3xl font-medium text-richblack-100 mx-auto'>Your cart is empty</div> : 
    <div className='flex flex-row gap-x-8 mb-6'>
    {
        <div className='flex flex-col gap-y-9 flex-1 border-r-[1px] border-richblack-400 pr-8'>
        {
        cart?.map((course,index)=>(
                <div className='flex flex-row flex-1 justify-between border-b-[1px] border-richblack-300 pb-4' key={index}>
                    <div className='flex flex-col gap-y-2' key={index}>
                        <img src={course.thumbnail} alt='thumbnail' className='h-[148px] w-[220px] rounded-lg object-cover'/>
                        <div className="text-xl font-semibold text-richblack-5">{course.title}</div>
                        <div className='text-sm font-light text-richblack-200'>{course.category.name}</div>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='text-yellow-50'>{getAverageRating(course)}</div>
                            <Rating starValue={getAverageRating(course)} readOnly={true}/>
                            <div className='text-richblack-200'>{`${course?.ratingAndReview?.length} Ratings`}</div>
                        </div>
                    </div> 
                    <div className='flex flex-col gap-3'>
                        <button className='flex flex-row items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200'   onClick={() => {
                        dispatch(setCart(cart.filter(oneCourse => oneCourse !== course)));
                        dispatch(setNumberOfItems(numberOfItems-1));
                        localStorage.setItem("cart",cart.filter(oneCourse=>oneCourse!==course));
                        localStorage.setItem("items",JSON.stringify(numberOfItems-1));
                      }}>
                        <MdDelete size={"18px"}/>
                        <div>Remove</div>
                        </button>
                        <div className='text-3xl font-medium text-yellow-100 text-end'>{`₹ ${course.price}`}</div>
                    </div>
                </div>
        ))
        }
        </div>
        }
        <div className='min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 flex flex-col gap-2 h-fit'>
                    <div className='text-richblack-200'>Total:</div>
                    <div className='text-3xl font-medium text-yellow-100'>{`₹ ${totalPrice()}`}</div>
                    <button className='bg-yellow-50 font-bold rounded-md py-2' onClick={()=>handleBuy()}>Buy Now</button>
                </div>
        </div>
    }
    </div>
    </div>
  )
}
