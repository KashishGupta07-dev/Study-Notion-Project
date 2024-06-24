import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { DeleteAccount } from "./Settings/DeleteAccount";
import { BsUpload } from "react-icons/bs";
import {
  updateProfile,
  updateProfilePicture,
} from "../../../services/operations/profileApi";
import { useForm } from "react-hook-form";
import { ChangePasswordForm } from "./Settings/ChangePasswordForm";
export const Settings = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const inputFileRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const additionalDetails = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    dateOfBirth: user?.additionalDetails?.dateOfBirth,
    gender: user?.additionalDetails?.gender,
    contactNumber: user?.additionalDetails?.contactNumber,
    about: user?.additionalDetails?.about,
  };
  function clickHandler() {
    inputFileRef.current.click();
  }
  function handleChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const previewFile = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(previewFile);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  }
  function uploadClickHandler() {
    const formData = new FormData();
    formData.append("displayPicture", file);
    console.log("Form : ", formData);
    dispatch(updateProfilePicture(formData, token, setPreviewImage));
  }
  function submitHandler(data) {
    data.token = token;
    console.log("Updated Form Data : ",data);
    dispatch(updateProfile(data));
    console.log("Hello User : ",user);
  }
  return (
    <div className=" h-[calc(100vh-3.5rem)] overflow-auto">
      <div className="w-11/12 flex flex-col mx-auto gap-5">
        <div className="text-richblack-5 text-3xl font-medium mt-14">
          Edit Profile
        </div>
        <section className="w-full bg-richblack-800 py-8 px-10 mt-8 rounded-md border-[1px] border-richblack-700 flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3 items-center">
            <img
              src={previewImage ? previewImage : user?.image}
              alt="User"
              className="object-cover rounded-full w-[78px] aspect-square"
            />
            <div className=" flex flex-col gap-2">
              <div className="text-richblack-5 text-lg font-medium">
                Change Profile Picture
              </div>
              <div className="flex flex-row gap-4">
                <input
                  type="file"
                  ref={inputFileRef}
                  onChange={handleChange}
                  className=" hidden"
                />
                <button
                  onClick={clickHandler}
                  className="bg-richblack-700 text-richblack-400 px-6 rounded-md py-2 font-semibold cursor-pointer"
                >
                  Select
                </button>
                <button
                  className="bg-yellow-50 text-black px-6 rounded-md py-2 font-semibold"
                  onClick={uploadClickHandler}
                >
                  <div className="flex flex-row items-center gap-4">
                    <div>Upload</div>
                    <BsUpload />
                  </div>
                </button>
                <button
                  onClick={()=>setPreviewImage(null)}
                  className="bg-yellow-50 text-black px-6 rounded-md py-2 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>

        <form
          className="w-full bg-richblack-800 py-8 px-10 mt-8 rounded-md border-[1px] border-richblack-700 flex flex-row justify-between items-baseline"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col gap-12 w-full">
            <div className="text-richblack-5 text-xl font-semibold">
              Profile Information
            </div>
            <div className="flex flex-row gap-4">
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
                  First Name <sup className="text-pink-400">*</sup>
                </p>
                <input
                  placeholder="Enter First Name"
                  type="text"
                  name="firstName"
                  defaultValue={additionalDetails.firstName}
                  className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
                  style={{
                    boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
                  }}
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "Please Enter Your First Name",
                    },
                  })}
                />
                {errors.firstName && (
                  <span className="mt-1 text-[12px] text-yellow-100">
                    {errors.firstName.message}
                  </span>
                )}
              </label>
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
                  Last Name
                </p>
                <input
                  placeholder="Enter Last Name"
                  type="text"
                  name="lastName"
                  defaultValue={additionalDetails.lastName}
                  className="bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none"
                  style={{
                    boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
                  }}
                  {...register("lastName")}
                />
              </label>
            </div>
            <div className="flex flex-row gap-4">
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
                  Date Of Birth <sup className="text-pink-400">*</sup>
                </p>
                <input
                  placeholder="dd-mm-yyyy"
                  type="date"
                  name="dateOfBirth"
                  defaultValue={additionalDetails.dateOfBirth}
                  className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
                  style={{
                    boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
                  }}
                  {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: "Please Enter Date Of Birth",
                    },
                  })}
                />
                {errors.dateOfBirth && (
                  <span className="mt-1 text-[12px] text-yellow-100">
                    {errors.dateOfBirth.message}
                  </span>
                )}
              </label>
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
                  Gender <sup className="text-pink-400">*</sup>
                </p>
                <select
                  name="gender"
                  defaultValue={additionalDetails.gender?additionalDetails.gender:"Male"}
                  className="bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none"
                  style={{
                    boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
                  }}
                  {...register("gender", {
                    required: { value: true, message: "Please Enter Gender" },
                  })}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </label>
            </div>
            <div className="flex flex-row gap-4">
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
                  Contact Number <sup className="text-pink-400">*</sup>
                </p>
                <input
                  placeholder="Enter Contact Number"
                  type="number"
                  name="contactNumber"
                  defaultValue={additionalDetails.contactNumber}
                  className="bg-richblack-700 rounded-md px-4 py-3  text-richblack-5 placeholder-richblack-200 w-full  outline-none"
                  style={{
                    boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
                  }}
                  {...register("contactNumber", {
                    required: {
                      value: true,
                      message: "Please Enter Contact Number",
                    },
                  })}
                />
                {errors.contactNumber && (
                  <span className="mt-1 text-[12px] text-yellow-100">
                    {errors.contactNumber.message}
                  </span>
                )}
              </label>
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
                  About
                </p>
                <input
                  placeholder="Enter Bio Details"
                  type="text"
                  name="about"
                  defaultValue={additionalDetails.about}
                  className="bg-richblack-700 rounded-md px-4 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none"
                  style={{
                    boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
                  }}
                  {...register("about")}
                />
              </label>
            </div>
            <div className="flex flex-row-reverse gap-6 justify-start">
              <button
                className="bg-richblack-700 text-richblack-400 px-6 rounded-md py-2 font-semibold cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  reset({
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    dateOfBirth: user?.additionalDetails?.dateOfBirth,
                    gender: user?.additionalDetails?.gender,
                    contactNumber: user?.additionalDetails?.contactNumber,
                    about: user?.additionalDetails?.about,
                  });
                }}
              >
                Cancel
              </button>
              <input
                type="submit"
                className="bg-yellow-50 text-black px-6 rounded-md cursor-pointer py-2 font-semibold"
              />
            </div>
          </div>
        </form>

        <ChangePasswordForm/>
        <DeleteAccount/>
      </div>
    </div>
  );
};
