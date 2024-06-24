import React, {  useEffect, useState } from 'react'
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
export const Rating = ({starValue,readOnly,customClass,register,setValue}) => {
    const [fullStars,setfullStars] = useState(Math.floor(starValue));
    const [halfStars,setHalfStars] = useState(starValue-Math.floor(starValue));
    useEffect(()=>{
        if(register && setValue){
        setValue("rating",fullStars);
        register("rating");
        }
        else{
            return;
        }
    },[fullStars])
    function Fullstar(){
        let arr = [];
        for(let i = 1;i<=fullStars;i++){
           arr.push(i);
        }
        return arr.map((element,index)=>(
            <IoIosStar key={index} className={`text-yellow-50 ${!readOnly ? "cursor-pointer" : ""}`} size={customClass?.size && customClass?.size } onClick={()=>changeHandler(index+1)}/>
        ))
    }
    function Halfstar(){
        let arr = [];
        for(let i = 1;i<=halfStars;i++){
           arr.push(i);
        }
        return arr.map((element,index)=>(
            <IoIosStarHalf key={index} size={customClass?.size && customClass?.size } className={`text-yellow-50 ${!readOnly ? "cursor-pointer" : ""}`}/>
        ))
    }
    function changeHandler(rating){
        if(!readOnly){
        setfullStars(Math.floor(rating));
        setHalfStars(rating-Math.floor(rating));
        }
    }
    function EmptyStar(){
        let arr = [];
        for(let i = 5-fullStars-halfStars;i>0;i--){
            arr.push(i);
        }
        return arr.map((element,index)=>(
            <IoIosStarOutline key={index} className={`text-yellow-50 ${!readOnly ? "cursor-pointer" : ""}`} size={customClass?.size && customClass?.size } onClick={()=>changeHandler(fullStars+index+1)}/>
        ))
    }
  return (
    <div className={`flex flex-row ${customClass?.gap ? `gap-x-${customClass?.gap}` : ""}`}>
        {
            Fullstar()
        }
        {
            Halfstar()
        }
        {
            EmptyStar()
        }
    </div>
  )
}
