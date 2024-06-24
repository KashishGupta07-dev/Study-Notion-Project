import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Navigation,Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import { CourseCard } from './CourseCard';
import { useSelector } from 'react-redux';
export const SwiperCard = ({topSellingCourses,selectedCategory,heading}) => {
  const {user} = useSelector((state)=>state.profile);
  return (
    <div className='flex flex-col gap-8 mt-6 w-11/12 mx-auto'>
      {  <div className='text-2xl font-semibold text-richblack-5'>{heading}</div>}
        {
            selectedCategory && selectedCategory.length>0 && <div className='w-full border-b-[1px] flex flex-row text-richblack-200 gap-6 border-richblack-200'>
            <div className='text-yellow-50 border-b-[1px] border-yellow-50'>Most Popular</div>
            <div>New</div>
            <div>Trending</div>
        </div>
        }
        <Swiper   
        pagination={{
          clickable:true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination,Autoplay,Navigation]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        spaceBetween={25}
        className="w-full h-full">
        {
        (selectedCategory? selectedCategory?.course : topSellingCourses)?.map((course)=>(
              !course?.studentsEnrolled?.includes(user?._id) && 
                <SwiperSlide key={course._id}>
                <CourseCard course={course}/>
                </SwiperSlide>
        ))
        }
        </Swiper>
        </div>
  )
}
