import React from 'react'
import Template from '../components/core/Auth/Template'
import SignupImage from "../assets/Images/signup.webp"
export default function Signup() {
  return (
    <div>
       <Template heading={"Join the millions learning to code with StudyNotion for free"} subHeading={"Build skills for today, tomorrow, and beyond."} subHeadingOther={"Education to future-proof your career."} signup={true} Image={SignupImage}/>
    </div>
  )
}
