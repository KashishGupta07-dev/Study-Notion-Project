import React, { useState } from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import { IconComponent } from './IconComponent';
import { Link, matchPath, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../common/Modal';
import { useLocation } from 'react-router-dom';
import { logoutHandler } from '../../../services/operations/authApi';
import { AiOutlineShoppingCart } from "react-icons/ai";
export const SideBar = () => {
    const {user} = useSelector((state)=>state.profile);
    const location = useLocation();
    const navigate = useNavigate();
    const [showModal,setShowModal] = useState(false);
    const dispatch = useDispatch();
    function firstBtnClickHandler(){
        dispatch(logoutHandler(navigate));
        setShowModal(false);
    }
    function secondBtnClickHandler(){
        setShowModal(false);
    }
    function matchRoute(route){
        return matchPath({path:route},location.pathname);
    }
    return (
        <div className='hidden md:block min-w-[220px] bg-richblack-800 h-[calc(100vh-3.5rem)] text-richblack-200 border-r-[0.5px] border-richblack-700'>
            <div className='flex flex-col font-semibold text-base gap-8 transition-all duration-200'>
            <div className='flex flex-col mt-14 gap-2'>
                {
                    sidebarLinks.map((element)=>(
                      element?.type ? element?.type === user.accountType && <Link to={element.path} className={`flex flex-row ${matchRoute(element.path)?"border-opacity-100 bg-yellow-800  text-yellow-50":""} border-l-[2px] border-l-yellow-25 border-opacity-0 px-8 py-2 font-medium items-center gap-2`} key={element.id}>
                        {element.name==="Your Cart"?<AiOutlineShoppingCart/>:<IconComponent name={element.icon}/>}
                            <div>{element.name}</div>
                        </Link> :<Link to={element.path} className={`flex flex-row px-8 py-2 font-medium ${matchRoute(element.path)?"border-opacity-100 bg-yellow-800  text-yellow-50":""} border-l-[2px] border-l-yellow-25 border-opacity-0  items-center gap-2`}  key={element.id}>
                        {element.name==="Your Cart"?<AiOutlineShoppingCart/>:<IconComponent name={element.icon}/>}
                            <div>{element.name}</div>
                        </Link>
                    ))
                }
                </div>
                <div className='bg-richblack-700 h-[0.5px] max-w-[85%] translate-x-4'></div>
                <div className='flex flex-col gap-2'>
                <Link to={"/dashboard/settings"} className={`flex flex-row px-8 py-2 font-medium ${matchRoute("/dashboard/settings")?"border-opacity-100 bg-yellow-800  text-yellow-50":""} border-l-[2px] border-l-yellow-25 border-opacity-0  items-center gap-2`} >
                        <IconComponent name={"VscSettingsGear"}/>
                            <div>{"Settings"}</div>
                        </Link>
                <div className='flex flex-row items-center gap-2 px-8 py-2 font-medium cursor-pointer' onClick={()=>setShowModal(true)}>
                <IconComponent name={"VscSignOut"}/>
                <div>{"Logout"}</div>
                </div>
                </div>
                        <div className={`${showModal?"visible":"invisible"}`}>
                        <Modal heading={"Are You Sure?"} subheading={"You will be logged out of your account."} firstBtnText={"Logout"} secondBtnText={"Cancel"} firstBtnClickHandler={firstBtnClickHandler} secondBtnClickHandler={secondBtnClickHandler}/>
                        </div>
                        </div>
        </div>
    );
}
