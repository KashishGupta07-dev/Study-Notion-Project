import React from 'react'
import { Outlet } from 'react-router'
import { SideBar } from '../components/core/Dashboard/SideBar'
export const Dashboard = () => {
  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
    <div>
      <SideBar/>
    </div>
    <div className='w-full'>
    <Outlet/>
    </div>
    </div>
  )
}
