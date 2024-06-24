import React from 'react'
import Template from "../components/core/Auth/Template";
import LoginImage from "../assets/Images/login.webp"
export default function Login() {
  return (
    <Template heading={"Welcome Back"} subHeading={"Build skills for today, tomorrow, and beyond."} subHeadingOther={"Education to future-proof your career."} signup={false} Image={LoginImage}/>
  )
}
