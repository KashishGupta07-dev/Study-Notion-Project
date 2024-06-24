import React, { useEffect, useState } from 'react'
import PieChart from './PieChart'
import { getInstructorDetailsApi } from '../../../../services/operations/profileApi';
import { useSelector } from 'react-redux';
import { Spinner } from '../../common/Spinner';
import { useNavigate } from 'react-router';

export const InstructorDashboard = () => {
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const [clickedStudent,setClickedStudent] = useState(true);
    const navigate = useNavigate();
    const [instructorDetails,setInstructorDetails] = useState(null);
    useEffect(()=>{
        setLoading(true);
        getInstructorDetailsApi(token,setInstructorDetails,setLoading);
        // eslint-disable-next-line
    },[])
    function courseNames(){
        let courseName = [];
        instructorDetails?.courses?.forEach((course)=>{
            courseName = [...courseName,course?.courseName];
        })
        console.log("Course Names : ",courseName);
        return courseName;
    }
    function dataFinder(){
        let data = [];
        instructorDetails?.courses?.forEach((course)=>{
            data = [...data,course?.studentsEnrolled?.length];
        })
        console.log("Data : ",data);
        return data;
    }
    function calcTotalStudents(){
        let totalStudents = 0;
        instructorDetails?.courses?.forEach((course)=>{
            totalStudents+= (course?.studentsEnrolled?.length);
        })
        return totalStudents;
    }
    function calcTotalIncome(){
        let totalIncome = 0;
        instructorDetails?.courses?.forEach((course)=>{
            totalIncome+= (course?.price* course?.studentsEnrolled?.length);
        })
        return totalIncome;
    }
    function incomeFinder(){
        let incomeData = [];
        instructorDetails?.courses?.forEach((course)=>{
            incomeData = [...incomeData,(course?.price* course?.studentsEnrolled?.length)];
        })
        return incomeData;
    }
  return (
    loading?<Spinner/> : instructorDetails?.courses?.length>0 && 
    <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
    <div className=' w-2/3 mx-auto flex flex-col gap-y-5'>
    <div className=' mt-8'>
    <div className='font-bold text-richblack-5 text-3xl'>{`Hi ${instructorDetails?.firstName}👋`}</div>
    <div className='text-richblack-200 font-medium text-sm'>Let's Start Something New</div>
    </div>
    <div className='flex flex-row justify-around'>
        <div className='bg-richblack-800 py-4 pl-6 w-[450px] rounded-lg gap-y-3 flex flex-col'>
        <div className='text-richblack-5 font-bold text-lg'>Visualize</div>
        <div className='flex flex-row text-yellow-50 font-bold gap-x-7'>
            <div className={`${clickedStudent? "bg-richblack-600 border-[1px] border-richblack-400" : ""} cursor-pointer py-1 rounded-md px-2`} onClick={()=>setClickedStudent(true)}>Students</div>
            <div className={`${!clickedStudent? "bg-richblack-600 border-[1px] border-richblack-5" : ""} cursor-pointer py-1 rounded-md px-2`} onClick={()=>setClickedStudent(false)}>Income</div>
        </div>
        <div >
            <PieChart courseNames={courseNames()} dataSet={clickedStudent?dataFinder():incomeFinder()} labelData={clickedStudent?"Number Of Students": "Income (in Rupees)"}/>
            </div>
        </div>
        <div className='bg-richblack-800 gap-y-5 py-4 px-8 rounded-lg flex flex-col h-fit'>
        <div className='text-richblack-5 text-lg font-bold'>Statistics</div>
        <div>
            <div className='text-richblack-200 font-semibold'>Total Courses: </div>
            <div className='text-richblack-5 font-bold'>{instructorDetails?.courses?.length} {" Courses"}</div>
            </div>
            <div>
                <div className='text-richblack-200 font-semibold'>Total Students</div>
                <div className='text-richblack-5 font-bold'>{calcTotalStudents()} {" Students"}</div>
            </div>
            <div>
                <div className='text-richblack-200 font-semibold'>Total Income</div>
                <div className='text-richblack-5 font-bold'>{"Rs. "}{calcTotalIncome()}</div>
            </div>
        </div>  
        </div>
        <div className='bg-richblack-800 rounded-lg flex flex-col gap-y-4 mb-8'>
                <div className='flex flex-row justify-between mx-4 text-lg font-semibold items-center border-b-[1px] border-richblack-200 mt-2'>
                <div className='text-richblack-5'>Your Courses</div>
                <div className='text-yellow-50 text-sm cursor-pointer' onClick={()=>navigate(`/dashboard/my-courses`)}>View All</div>
                </div>
                <div className='flex flex-row gap-x-3 justify-around px-4 pb-4'>
                    {
                        instructorDetails?.courses?.map((course,index)=>(
                            index<=3 && index> 0 && 
                            <div className='border-[2px] border-blue-100 rounded-lg cursor-pointer' onClick={()=>navigate(`/dashboard/my-coourses`)} key={course?.id}>
                                <img src={course?.thumbnail} alt='thumbnail' className='w-[230px] h-[130px] object-cover rounded-lg px-2 py-2'/>
                                <div className='text-lg text-richblack-5 font-semibold  px-2 '>{course?.courseName}</div>
                                <div className='flex flex-row justify-around text-richblack-400 text-sm'>
                                    <div>{`${course?.studentsEnrolled?.length} students`}</div>
                                    <div> | </div>
                                    <div>{`Rs. ${course?.price}`}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
        </div>
        </div>
    </div>
  )
}
