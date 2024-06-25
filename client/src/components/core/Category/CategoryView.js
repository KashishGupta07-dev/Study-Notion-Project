import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router'
import { getCategoryPageDetailsApi } from '../../../services/operations/Categories';
import 'swiper/css';
import { SwiperCard } from './SwiperCard';
import Footer from '../Home/Footer';
import { Rating } from '../common/Rating';
import { Link } from 'react-router-dom';
import { Spinner } from '../common/Spinner';
import { getAverageRating } from '../../../services/operations/averageRatingCalculator';
export const CategoryView = () => {
    const [selectedCategory,setSelectedCategory] = useState(null);
    const [differentCategory,setDifferentCategory] = useState(null);
    const [topSellingCourses,setTopSellingCourses] = useState(null);
    const [loading,setLoading] = useState(false);
    let totalCourse = 0
    let maxCourse = 4;
    const dispatch = useDispatch();
    const {categoryName} = useParams();
    const realCategoryName = categoryName.split("-").join(" ");
    const {user} = useSelector((state)=>state.profile);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        setLoading(true);
        dispatch(getCategoryPageDetailsApi(realCategoryName,setSelectedCategory,setDifferentCategory,setTopSellingCourses,navigate,setLoading));
        // eslint-disable-next-line
    },[location.pathname])
  return (
    loading?<Spinner/> : 
    <div className='flex flex-col'>
        <div className='bg-[#161D29] min-h-[244px]'>
        <div className='w-11/12 mx-auto flex min-h-[244px] flex-col justify-center gap-8'>
            <div className='text-richblack-200'>{`Home / Catalog / `}<span className='text-yellow-50'>{`${selectedCategory?.name}`}</span></div>
            <div className='text-2xl font-semibold text-richblack-5'>{`${selectedCategory?.name}`}</div>
            <div className='text-richblack-200 text-sm'>{selectedCategory?.description}</div>
            </div>
        </div>
        {   selectedCategory && selectedCategory?.course?.length>0 ?
            <SwiperCard heading={"Courses to get you started"} selectedCategory={selectedCategory}/>
            :   <div className='w-11/12 mx-auto mt-6'>
            <div className='text-2xl font-semibold text-richblack-5'>{"Courses to get you started"}</div>
            <div className='text-3xl text-center text-richblack-200 my-8'>No Course Found For Selected Category</div>
            </div>
            }
            { topSellingCourses && topSellingCourses?.length>0  ?
        <SwiperCard heading={"Top Selling Courses"} topSellingCourses={topSellingCourses}/>
        :<div className='w-11/12 mx-auto mt-6'>
            <div className='text-2xl font-semibold text-richblack-5'>{"Courses to get you started"}</div>
            <div className='text-3xl text-center text-richblack-200 my-8'>No Course Found</div>
            </div>
            }
        <div className='w-11/12 mx-auto mt-6'>
        <div className='text-2xl font-semibold text-richblack-5'>Frequently Bought Together</div>
        <div className="grid grid-cols-2 gap-4 my-10">
        {
            differentCategory?.map((category)=>(
                category?.course?.map((course)=>{
                    if(totalCourse>=maxCourse){
                        return null;
                    }
                    if( !course?.studentsEnrolled?.includes(user?._id) && course?.status === "Published"){
                   
                    totalCourse++;
                    return(
                <Link to={`/course/${course?._id}`} className='flex flex-col rounded-lg gap-2' key={course._id}>
                <img src={course.thumbnail} alt='thumbnail' className='h-[300px] w-[full] rounded-lg object-cover'/>
                <div className='text-richblack-5 font-semibold text-2xl'>{course.courseName}</div>
                <div className='text-richblack-200 font-medium text-lg'>{`Created By : ${course.instructor.firstName} ${course.instructor.lastName?course.instructor.lastName : ""}`}</div>
                <div className='flex flex-row items-center text-richblack-200 gap-2 text-xl'>
                <div className='text-yellow-50'>{getAverageRating(course)}</div>
                <Rating starValue={getAverageRating(course)} readOnly={true}/>
                <div>{`${course?.ratingAndReview?.length} Ratings`}</div>
                </div>
                <div className='text-richblack-5 font-semibold text-xl'>{`₹ ${course.price}`}</div>
                </Link>
                    )
                    }

                    return null;
        })
            ))
        }
        </div>
        {
            totalCourse === 0 && <div className='text-richblack-5 font-medium text-3xl text-center mb-10'>No Course Found</div>
        }
        </div>
        <Footer/>
    </div>
  )
}
