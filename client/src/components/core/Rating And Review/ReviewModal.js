import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "../common/Rating";
import { RxCross2 } from "react-icons/rx";
import { postRatingApi } from "../../../services/operations/coursesApi";
import { useForm } from "react-hook-form";
export const ReviewModal = ({
  setReviewModal,
  setLoading,
  setCourseDetails,
}) => {
  const { courseDetails } = useSelector((state) => state.viewCourse);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  function postReview(data) {
    setLoading(true);
    dispatch(postRatingApi(courseDetails?._id,data.rating,data.review,token,setCourseDetails,setLoading,setReviewModal));
  }
  return (
    <div
      className="fixed w-full left-0 bottom-0 right-0 top-0 h-full bg-opacity-10 backdrop-blur-sm flex items-center justify-center bg-white"
      onSubmit={handleSubmit(postReview)}
    >
      <form className="w-[500px]  border-[0.5px] rounded-md border-pure-greys-100  bg-richblack-900">
        <div className="flex flex-row bg-richblack-700 justify-between px-4 py-4 rounded-md text-richblack-5 font-semibold">
          <div>Add Review</div>
          <RxCross2
            className="cursor-pointer"
            onClick={() => setReviewModal(false)}
          />
        </div>
        <div className="pl-5 pr-6 py-4 flex flex-col gap-4">
          <div className="ml-7 flex flex-row gap-x-7 items-center">
            <img
              src={courseDetails?.instructor?.image}
              alt="Instructor"
              className="w-[100px] h-[100px] rounded-full"
            />
            <div className="text-richblack-5 font-semibold text-xl">
              <span>{courseDetails?.instructor?.firstName}</span>{" "}
              <span>{courseDetails?.instructor?.lastName}</span>
              <div className="text-base text-richblack-200">
                Posting Publicly
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <Rating
              starValue={0}
              readOnly={false}
              customClass={{
                size: "35px",
                gap: "2",
              }}
              register={register}
              setValue={setValue}
            />
          </div>
          {getValues().rating === 0 && (
            <span className="mt-1 text-[12px] text-pink-100">
              {"Please Enter Rating"}
            </span>
          )}
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
              First Name <sup className="text-pink-400">*</sup>
            </p>
            <textarea
              placeholder="Add Your Experience With Us"
              rows={8}
              name="review"
              className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
              style={{
                boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
              }}
              {...register("review", {
                required: {
                  value: true,
                  message: "Please Enter Your Experience",
                },
              })}
            />
            {errors.review && (
              <span className="mt-1 text-[12px] text-pink-100">
                {errors.review.message}
              </span>
            )}
          </label>
          <div className="flex flex-row justify-end gap-x-4">
            <button
              className="px-4 py-2 text-richblack-5 bg-richblack-700 rounded-md font-bold"
              onClick={() => setReviewModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-black bg-yellow-50 rounded-md font-bold"
              type="submit"
            >
              Post Review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
