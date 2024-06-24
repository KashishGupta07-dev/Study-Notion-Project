import React, { useEffect } from 'react'
import CompanyLogo from "../../../assets/Logo/Logo-Full-Light.png";
import { Link} from 'react-router-dom';
import { NavbarLinks } from '../../../data/navbar-links';
import { matchPath, useLocation } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { PiShoppingCart } from "react-icons/pi";
import { categoriesApi } from '../../../services/apis';
import { ProfileDropdown } from '../Auth/ProfileDropdown';
import { LuMenuSquare } from "react-icons/lu";
export default function NavBar() {
    const location = useLocation();
    const {token} = useSelector((state)=>state.auth);
    const [categories,setCategories] = useState(null);
    const [spinner,setSpinner] = useState(false);
    const {user} = useSelector((state)=>state.profile);
    const {numberOfItems} = useSelector((state)=>state.cart);
    const [showDropDown,setShowDropDown] = useState(false);
    function isClicked(path){
        if(!path){
            return false;
        }
        return matchPath({path},location.pathname);
    }
    async function fetchApi(){
        try{
        setSpinner(true);
        const response =  await apiConnector("GET",categoriesApi.SHOW_ALL_CATEGORIES_API);
        setSpinner(false);
        setCategories(response?.data.allCategories);
    }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchApi();
    },[])
  return (
    <nav className='bg-richblack-800 border-b-[1px] border-richblack-700'>
    <div className='flex flex-row w-11/12 py-4 items-center justify-between max-w-maxContent mx-auto'>
    <Link to={"/"}>
        <img src={CompanyLogo} alt='Company Logo' className='w-[150px] lg:w-[170px]'/>
    </Link>
    <div className='flex flex-row invisible w-0 md:visible md:w-fit md:max-w-maxContent justify-center gap-5 text-richblack-5'>
        {
           NavbarLinks.map((element,index)=>(
            element.title==="Catalog"?
            <div className='flex flex-row items-center gap-1 cursor-pointer group relative' key={index}>
                <div className={`flex flex-row gap-x-1 items-center ${isClicked("/catalog/:categoryName")?"text-yellow-25":""}`} >
                <div>Catalog</div>
                <IoIosArrowDown/>
                </div>
                <div className='h-[500px] pr-2 overflow-auto absolute transition-all duration-200 top-[2.3rem] pl-2 py-4 z-[40] left-[-5rem] rounded-lg invisible gap-5 items-start justify-center text-lg group-hover:visible flex flex-col bg-richblack-5 text-richblack-800' style={{ scrollbarWidth: "none", msOverflowStyle:"none" }}>
                    {
                        spinner?<div className='pl-5 pr-48 py-3 translate-x-[25%]'>Loading.....</div>:
                        !categories?<div className='pl-5 py-3 pr-3 whitespace-nowrap '>No Categories Available!!</div>:
                       categories.map((category)=>(
                        <Link to={`/catalog/${category.name.split(" ").join("-")}`} key={category._id}>
                            <div className=' mx-auto pl-4 w-48 text-sm py-3 rounded-lg hover:bg-richblack-25 hover:text-black'>{category.name}</div>
                        </Link>
                       ))
                    }
                </div>
                <div className='absolute invisible transition-all duration-200 group-hover:visible h-8 w-8 rotate-45 rounded bg-richblack-5 top-6 translate-x-[3.5rem]'></div>
            </div>
            :
            <Link to={element?.path} key={index}>
                <div className={`${isClicked(element?.path)?"text-yellow-25":""}`}>{element.title}</div>
            </Link>
           ))
        }
    </div>
    <div>
        {!token && (
        <div className='flex flex-row  items-center gap-4'>
            <Link to={"/login"} className='w-0 md:w-fit'>
                <div className=' border-[1px] invisible md:visible md:w-fit border-pure-greys-100 rounded-lg py-2 px-4 text-richblack-5'>Login</div>
            </Link>  
            <Link to={"/signup"} className='w-0 md:w-fit'>
                <div className=' border-[1px] invisible md:visible md:w-fit border-pure-greys-100 rounded-lg py-2 px-4 text-richblack-5'>Signup</div>
            </Link>
            <div className='relative visible md:invisible md:w-0'>
            <LuMenuSquare size={"30px"} color='white' onClick={()=>setShowDropDown(!showDropDown)}/> 
            <div className={`absolute ${showDropDown?"visible":"invisible"} opacity-100 md:opacity-0 transition-all duration-200 flex flex-col gap-4 z-[200] top-9 py-2 px-2 left-[-240%] rounded-md bg-richblack-5`}>
                <Link to={"/login"}>
                <div className=' pr-8 pl-3 py-2 rounded-md hover:bg-richblack-200 hover:text-richblack-5'>Login</div>
                </Link>
                <Link to={"/signup"}>
                    <div className=' pr-8 pl-3 py-2 rounded-md hover:bg-richblack-200 hover:text-richblack-5'>Signup</div>
                </Link>
                <Link to={"/about"}>
                    <div className=' pr-8 pl-3 py-2 rounded-md hover:bg-richblack-200 hover:text-richblack-5'>About</div>
                </Link>
                <Link to={"/contact"}>
                    <div className=' pr-8 pl-3 py-2 rounded-md hover:bg-richblack-200 hover:text-richblack-5'>Contact</div>
                </Link>
            </div>
            <div className={`h-6 ${showDropDown?"visible":"invisible"} opacity-100 md:opacity-0 transition-all duration-200 w-6 rounded-sm rotate-45 top-8 absolute left-2 bg-richblack-5`}></div>
            </div>
        </div>
        )
        }
        {
            user && user?.accountType!=="Instructor" && token &&
            (
            <div className='flex flex-row items-center gap-6'>
            <div className='relative text-richblack-5'>
                <Link to={"/dashboard/cart"}>
                    <PiShoppingCart size={"30px"}/>
                </Link>
                {
                    numberOfItems!==0 && (
                        <div className='absolute -bottom-2 h-5 w-5 overflow-hidden text-xs rounded-full -right-2 font-bold bg-richblack-600 text-yellow-200 flex items-center justify-center'>{numberOfItems}</div>
                    )
                }
                </div>
                <ProfileDropdown/>
                </div>
            )
        }
        {
            token && user&& user?.accountType==="Instructor" && (<ProfileDropdown/>)
        }
    </div>
    </div>
    </nav>
  )
}
