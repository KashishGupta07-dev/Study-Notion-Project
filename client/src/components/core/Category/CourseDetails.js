import React, { useEffect, useState } from 'react'
import { getCourseDetailsApi } from '../../../services/operations/coursesApi';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router';
import {Rating} from "../common/Rating";
import { dateFormatter } from '../../../services/operations/dateFormatter';
import Footer from "../Home/Footer"
import { FaShareSquare } from "react-icons/fa";
import toast from 'react-hot-toast';
import { CourseContent } from './CourseContent';
import ReviewSection from '../Home/ReviewSection';
import { Modal } from '../common/Modal';
import { setCart,setNumberOfItems } from '../../../reducers/slices/CartSlice';
import { buyCourse } from '../../../services/operations/studentFeaturesApi';
import { Spinner } from '../common/Spinner';
import { getAverageRating } from '../../../services/operations/averageRatingCalculator';
export const CourseDetails = () => {
  const [courseDetails,setCourseDetails] = useState(null);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const {courseId} = useParams();
  const {cart,numberOfItems} = useSelector((state)=>state.cart);
  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const [showModal,setShowModal] = useState(false);
  const navigate = useNavigate();
  function copyHandler(){
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link Copied To Clipboard");
  }
  function cartHandler(course){
      if(!token){
      setShowModal(true);
      return;
    }
    if(!cart?.some(item=>item?._id === course?._id)){
    dispatch(setCart([...cart,course]));
    dispatch(setNumberOfItems(numberOfItems+1));
    localStorage.setItem("cart",JSON.stringify([...cart,course]));
    localStorage.setItem("items",JSON.stringify(numberOfItems+1));
    toast.success("Course Added Successfully");
    }
  }
  function removeCourse(course){
    if(cart?.some(item=>item?._id === course?._id)){
    dispatch(setCart(cart.filter(oneCourse=>oneCourse?._id!==course?._id)));
    dispatch(setNumberOfItems(numberOfItems-1));
    localStorage.setItem("cart",cart.filter(oneCourse=>oneCourse?._id!==course?._id));
    localStorage.setItem("items",JSON.stringify(numberOfItems-1));
    toast.success("Course Removed Successfully");
    }
  }

 async function buyCouseHandler(){
    if(!token){
      setShowModal(true);
      return;
    }
    setLoading(true);
    await buyCourse([courseId],token,user,navigate,dispatch);
    setLoading(false);
  }
  useEffect(()=>{
    setLoading(true);
    dispatch(getCourseDetailsApi(courseId,setCourseDetails,setLoading));
    // eslint-disable-next-line
  },[]);
  return (
    loading?<Spinner/>:
    courseDetails?.status === "Published" ?
    <div className='flex flex-col gap-y-6'>
      <div className='flex flex-col bg-[#161D29] relative'>
        <div className='w-11/12 mx-auto'>
        <div className='w-full lg:max-w-[60%] flex flex-col justify-center gap-y-6 py-20 mt-4'>
            <div className='text-4xl font-bold text-richblack-5'>{`${courseDetails?.category.name}`}</div>
            <div className='text-richblack-200 text-lg'>{courseDetails?.category?.description}</div>
           <div className='flex flex-row items-center text-richblack-200 gap-2 text-base sm:text-2xl'>
                <div className='text-yellow-50'>{getAverageRating(courseDetails)}</div>
            <Rating starValue={getAverageRating(courseDetails)} readOnly={true}/>
                <div className='text-yellow-50'>{`(${courseDetails?.ratingAndReview?.length} Reviews)`}</div>
                <div className='text-richblack-5 text-base sm:text-xl'>{`${courseDetails?.studentsEnrolled?.length} Students Enrolled`}</div>
              </div>
            <div className='text-richblack-5 text-base sm:text-xl'>{`Created By ${courseDetails?.instructor.firstName} ${courseDetails?.instructor?.lastName}`}</div>
            <div className='flex flex-row gap-x-4'>
              <div className='text-richblack-5 text-base sm:text-lg'>{`Created At : ${dateFormatter(courseDetails?.createdAt)}`}</div>
              <div className='text-richblack-5 text-base sm:text-lg'>English</div>
            </div>
            </div>
            </div>
            <div className='lg:absolute right-8 lg:bg-richblack-700 top-10 rounded-lg py-4 px-4'>
              <img src={courseDetails?.thumbnail} alt='thumbnail' className='w-full aspect-video lg:max-h-[300px] lg:min-h-[180px] lg:w-[400px] overflow-hidden rounded-2xl object-cover lg:max-w-full'/>
              <div className='flex flex-col w-11/12 mx-auto gap-y-4 mt-4'>
                  <div className='text-3xl text-richblack-5 font-bold'>{`Rs. ${courseDetails?.price}`}</div>
                  {!courseDetails?.studentsEnrolled?.includes(user?._id) && user?.accountType !== "Instructor" ?
                    <button className='py-2 px-4 bg-yellow-50 font-bold rounded-lg' onClick={()=>buyCouseHandler()}>Buy Now</button>
                    :
                    user?.accountType !== "Instructor" && <button className='py-2 px-4 bg-yellow-50 font-bold rounded-lg' onClick={()=>navigate("/dashboard/enrolled-courses")}>Go To Course</button>
                  }
                  {!courseDetails?.studentsEnrolled?.includes(user?._id) && user?.accountType !== "Instructor" && 
                    <button className='bg-richblack-700 lg:bg-richblack-800 text-richblack-5 rounded-lg font-bold'>{
                    !cart?.some(item => item?._id === courseDetails?._id) ? <div onClick={()=>cartHandler(courseDetails)} className='py-2 px-4'>Add To Cart</div>
                    :<div onClick={()=>removeCourse(courseDetails)} className='py-2 px-4'>Remove From Cart</div>
                    }</button>
                  }
                  {user?.accountType !== "Instructor" && <div className=' text-sm text-richblack-50 text-center'>30-Day Money-Back Guarantee</div>}
                  <div className='text-richblack-5 font-bold text-lg'>This Course Includes:</div>
                  <div className='flex flex-col text-caribbeangreen-200 gap-2'>
                      {
                        courseDetails?.instructions[0].split(",")?.map((instruction,index)=>(
                          <div key={index}>{`➤ ${instruction}`}</div>
                        ))
                      }
                  </div>
                  <button className='text-yellow-50 gap-x-2 w-fit mx-auto text-center flex flex-row items-center' onClick={copyHandler}>
                  <FaShareSquare/>
                    <div>Share</div>
                  </button>
                  </div>
              </div>
        </div>
        <div className='w-11/12 mx-auto'>
        <div className='w-full lg:max-w-[60%]  flex flex-col border-[1px] border-richblack-600 p-6 gap-y-3'>
                <div className='text-3xl text-richblack-5 font-bold'>What You Will Learn</div>
                <div className='text-richblack-200 text-lg'>
                  {
                    courseDetails?.whatYouWillLearn
                  }
                </div>
            </div>
            <CourseContent course={courseDetails}/>
            <div className='flex flex-col mt-8 gap-4 max-w-[60%]'>
                    <div className='text-richblack-5 text-3xl font-bold'>Author</div>
                    <div className='flex flex-row gap-x-4 items-center text-caribbeangreen-50 font-bold text-xl'>
                      <img src={courseDetails?.instructor?.image} alt='instructor' className='w-[52px] aspect-square rounded-full'/>
                      <div>{`${courseDetails?.instructor?.firstName} ${courseDetails?.instructor?.lastName?courseDetails?.instructor?.lastName:""}`}</div>
                    </div>
                    <div className='text-lg text-richblack-200'>{courseDetails?.instructor?.additionalDetails?.about ?courseDetails?.instructor?.additionalDetails?.about  : ""}</div>
                    </div>
                    <ReviewSection/>
            </div>
           {showModal && <Modal heading={"You are not logged in!"} subheading={"Please login to Buy Course"} firstBtnText={"Login"} secondBtnText={"Cancel"} firstBtnClickHandler={()=>navigate("/login")} secondBtnClickHandler={()=>setShowModal(false)}/>}
            <Footer/>
    </div> : <div className="flex items-center h-[100vh] justify-center text-4xl font-bold text-richblack-5">Course Not Found</div>
  )
}
