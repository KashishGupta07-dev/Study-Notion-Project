import React from 'react'
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux'
export const OpenRoute = ({children}) => {
    const {token} = useSelector((state)=>state.auth); 
  if(token===null){
    return children; 
  }
  else{
    return <Navigate to={"/dashboard/my-profile"}/>
  }
}
