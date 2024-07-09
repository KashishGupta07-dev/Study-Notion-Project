import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { updatePassword } from "../../../../services/operations/profileApi";
export const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function submitHandler(data) {
    data.token = token;
    data.navigate = navigate;
    dispatch(updatePassword(data));
    reset({
        oldPassword: "",
        newPassword:"",
        confirmNewPassword:"",
      });
  }
  const [eyePass, setEyePass] = useState(true);
  const [eyeNewPass, setEyeNewPass] = useState(true);
  const [eyeConfirmPass, setEyeConfirmPass] = useState(true);
  return (
    <form
      className="w-full mb-16 bg-richblack-800 py-8 px-10 mt-8 rounded-md border-[1px] border-richblack-700 flex flex-row justify-between items-baseline"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex flex-col gap-12 w-full">
        <div className="text-richblack-5 text-xl font-semibold">Password</div>
        <div className="flex flex-row flex-wrap lg:flex-nowrap  gap-4">
          <label className="relative w-full">
          <div className="relative ">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
              Password<sup className="text-pink-400">*</sup>
            </p>
            <div className="flex flex-row">
              <input
                placeholder="Enter Current Password"
                name="oldPassword"
                type={`${eyePass ? "password" : "text"}`}
                className=" bg-richblack-700 rounded-md pl-4 pr-14 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none"
                style={{
                  boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
                }}
                {...register("oldPassword", {
                  required: {
                    value: true,
                    message: "Please Enter Current Password",
                  },
                })}
              />
              </div>
              {eyePass ? (
                <IoEyeOutline
                  className=" cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200"
                  size={"25px"}
                  onClick={() => setEyePass(!eyePass)}
                />
              ) : (
                <IoEyeOffOutline
                  className="cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200"
                  size={"25px"}
                  onClick={() => setEyePass(!eyePass)}
                />
              )}
            </div>
            {errors.oldPassword && (
              <span className="mt-1 text-[12px] text-yellow-100">
                {errors.oldPassword.message}
              </span>
            )}
          </label>
          <label className="relative w-full">
          <div className="relative ">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
              New Password <sup className="text-pink-400">*</sup>
            </p>
            <div className="flex flex-row">
              <input
                placeholder="Enter New Password"
                name="newPassword"
                type={`${eyeNewPass ? "password" : "text"}`}
                className=" bg-richblack-700 rounded-md pl-4 pr-14 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none"
                style={{
                  boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
                }}
              
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "Please Enter New Password",
                  },
                })}
              />
              </div>
              {eyeNewPass ? (
                <IoEyeOutline
                  className=" cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200"
                  size={"25px"}
                  onClick={() => setEyeNewPass(!eyeConfirmPass)}
                />
              ) : (
                <IoEyeOffOutline
                  className="cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200"
                  size={"25px"}
                  onClick={() => setEyeConfirmPass(!eyeConfirmPass)}
                />
              )}
            </div>
            {errors.newPassword && (
              <span className="mt-1 text-[12px] text-yellow-100">
                {errors.newPassword.message}
              </span>
            )}
          </label>
          <label className="w-full">
          <div className="relative ">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-medium text-richblack-5">
              Confirm New Password <sup className="text-pink-400">*</sup>
            </p>
            <div className="flex flex-row">
              <input
                placeholder="Enter New Confirm Password"
                name="confirmNewPassword"
                type={`${eyeConfirmPass ? "password" : "text"}`}
                className=" bg-richblack-700 rounded-md pl-4 pr-14 py-3 text-richblack-5 placeholder-richblack-200 w-full outline-none"
                style={{
                  boxShadow: "rgba(255, 255, 255, 0.3) 0px -2px 0px inset",
                }}
                {...register("confirmNewPassword", {
                  required: {
                    value: true,
                    message: "Please Enter Confirm New Password",
                  },
                })}/>
                </div>
              {eyeConfirmPass ? (
                <IoEyeOutline
                  className=" cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200"
                  size={"25px"}
                  onClick={() => setEyeConfirmPass(!eyeConfirmPass)}
                />
              ) : (
                <IoEyeOffOutline
                  className="cursor-pointer absolute top-[50%] right-[0.9rem] text-richblack-200"
                  size={"25px"}
                  onClick={() => setEyeConfirmPass(!eyeConfirmPass)}
                />
              )}
            </div>
            {errors.confirmNewPassword && (
              <span className="mt-1 text-[12px] text-yellow-100">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </label>
        </div>
        <div className="flex flex-row-reverse gap-6 justify-start">
          <button
            className="bg-richblack-700 text-richblack-400 px-6 rounded-md py-2 font-semibold cursor-pointer"
            onClick={(event) => {
              event.preventDefault();
              reset({
                oldPassword: "",
                newPassword:"",
                confirmNewPassword:"",
              });
            }}
          >
            Cancel
          </button>
          <button
            className="bg-yellow-50 text-black px-6 rounded-md cursor-pointer py-2 font-semibold"
          type="submit"
          >Submit</button>
        </div>
      </div>
    </form>
  );
};
