import React from 'react'
import { FooterLink2 } from '../../../data/footer-links';
import Logo from "../../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import FooterLinks from './FooterLinks';
export default function Footer() {
    const data = FooterLink2;
  return (
    <div className='w-full min-h-[600px] bg-[#161D29] font-inter pb-5 flex flex-col  lg:items-center gap-4'>
        <div className='mx-auto w-[90%] text-sm flex flex-row flex-wrap gap-5 mt-2 pt-16 transition-all duration-300'>
            <div className='flex flex-col gap-5 text-richblack-400'>
                <img src={Logo} className='w-[150px]' alt='Logo'/>
                <div className='font-bold text-lg text-richblack-50'>Company</div>
                <div className='flex flex-col gap-3 mt-2 '>
                <Link to={"/about"}>
                    <div className='hover:text-richblack-5'>About</div>
                </Link>
                <Link to={"/carrers"}>
                    <div className='hover:text-richblack-5'>Careers</div>
                </Link>
                <Link to={"/affiliates"}>
                    <div className='hover:text-richblack-5'>Affiliates</div>
                </Link>
                <div className='flex flex-row gap-3'>
                    <FaFacebook size={"18px"}/>
                    <FaGoogle size={"18px"}/>
                    <FaTwitter size={"18px"}/>
                    <FaYoutube size={"18px"}/>
                </div>
                </div>
            </div>
           {
            data.map((value,index)=>{
                return(
                    <div key={index}>
                    {
                        index===4?<FooterLinks title={value.title} links={value.links} isIndex={true}/>:<FooterLinks title={value.title} links={value.links} isIndex={false} key={index}/>
                    }
                    </div>
                );
            })
           }
        </div>
        <div className='max-w-[95%] w-full h-[0.5px] bg-richblack-600 '></div>
        <div className='flex lg:flex-row flex-col lg:items-start gap-5 lg:gap-0 items-center lg:justify-between max-w-[90%] w-[90%] my-6 text-sm text-richblack-300'>
            <div className='flex flex-row gap-4 '>
            <Link to={"/privacypolicy"}>
                <div className='hover:text-richblack-5'>Privacy Policy</div>
            </Link>
            <div className=' cursor-default'>|</div>
            <Link to={"/cookiepolicy"}>
                <div className='hover:text-richblack-5'>Cookie Policy</div>
            </Link>
            <div className=" cursor-default">|</div>
            <Link to={"/terms"}>
                <div className='hover:text-richblack-5'>Terms</div>
            </Link>
            </div>
            <div>Made with ❤️ By Kashish Gupta</div>
        </div>
    </div>
  )
}
