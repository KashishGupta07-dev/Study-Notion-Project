import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRatingsApi } from "../../../services/operations/coursesApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay} from "swiper/modules";
import { RatingCard } from "../RatingAndReview/RatingCard";

export default function ReviewSection() {
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    dispatch(getAllRatingsApi(setRatings));
  }, [dispatch]);

  return (
    <div className="mt-16 mb-16">
      <div className="text-white text-3xl font-bold text-center">
        Reviews From Other Learners
      </div>
      <div className="mt-16">
        <Swiper
          loop={true}
          modules={[ FreeMode, Autoplay]}
          slidesPerView={2}
          spaceBetween={25}
          freeMode={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        >
          {ratings.map((rating, index) => (
            <SwiperSlide
              key={index}
              className="bg-richblack-800 cursor-pointer max-w-[800px]"
              style={{
                width: "fit-content",
              }}
            >
              <RatingCard rating={rating} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
