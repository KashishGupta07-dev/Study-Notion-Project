import {apiConnector} from "../apiConnector";
import {courseApi} from "../apis";
import toast from "react-hot-toast";
import {setUser} from "../../reducers/slices/ProfileSlice"
import {setCourse,setStep} from "../../reducers/slices/CourseSlice"
export function createCourse(formData,token){
    return async(dispatch)=>{
        console.log("Details :",formData)
    const toastId = toast.loading("Loading...");
    console.log("TOken: ",token);
    try{
        const response = await apiConnector("POST",courseApi.CREATE_COURSE_API,formData,{
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`
        });
        const success = response?.data.success;
        const message = response?.data.message;
        if(!success){
            toast.error("Course Creation Failed");
            console.log(message);
            return;
        }
        console.log("Response Created Course : ",response?.data.createdCourse);
        dispatch(setUser(response?.data.updatedUser));
        dispatch(setCourse(response?.data.createdCourse));
        localStorage.setItem("user",JSON.stringify(response?.data.updatedUser));
        dispatch(setStep(2));
    }catch(error){
        toast.error("Course Creation Failed");
        console.log(error);
    }
    toast.dismiss(toastId);
}
}


export function addSectionApi (formData,token){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",courseApi.ADD_SECTION_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Section Creation Failed");
                console.log(message);
                return;
            }
            toast.success("Section Created Successfully")
            dispatch(setCourse(response?.data.updatedCourse));
        }catch(error){
            toast.error("Section Creation Failed");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
}


export function editSectionApi(formData,token){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",courseApi.EDIT_SECTION_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Section Updation Failed");
                console.log(message);
                return;
            }
            toast.success("Section Updated Successfully")
            dispatch(setCourse(response?.data.updatedCourse));
        }catch(error){
            toast.error("Section Updation Failed");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
}




export function deleteSectionApi(formData,token){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",courseApi.DELETE_SECTION_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Section Deletion Failed");
                console.log(message);
                return;
            }
            toast.success("Section Deleted Successfully")
            dispatch(setCourse(response?.data.updatedCourse));
        }catch(error){
            toast.error("Section Deletion Failed");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
}



export function editCourseApi(formData,token){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",courseApi.EDIT_COURSE_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Course Updation Failed");
                console.log(message);
                return;
            }
            toast.success("Course Updated Successfully");
            dispatch(setCourse(response?.data?.updatedCourse));
            dispatch(setStep(2));
        }catch(error){
            toast.error("Course Updation Failed");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
}



export function getAllCoursesApi(token,setCourses){
    return async()=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("GET",courseApi.GET_ALL_COURSES_API,null,{
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Course Finding Failed");
                console.log(message);
                return;
            }
            setCourses(response?.data?.getAllCourses);
        }catch(error){
            toast.error("Course Finding Failed");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
} 


export function deleteCourseApi(courseId,categoryId,token,setCourses){
        return async()=>{
            const toastId = toast.loading("Loading...");
            try{
                const response = await apiConnector("POST",courseApi.DELETE_COURSE_API,{
                    courseId,categoryId
                },{
                    Authorization:`Bearer ${token}`
                });
                const success = response?.data.success;
                const message = response?.data.message;
                if(!success){
                    toast.error("Course Deletion Failed");
                    console.log(message);
                    return;
                }
                toast.success("Course Deletion Successful");
                console.log("Data : ",response?.data);
                setCourses(response?.data?.updatedUser?.courses);
            }catch(error){
                toast.error("Course Deletion Failed");
                console.log(error);
            }
            toast.dismiss(toastId);
        }
}



export function createSubSection(formData,token){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",courseApi.ADD_SUBSECTION_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Sub Section Creation Failed");
                console.log(message);
                return;
            }
            toast.success("Sub Section Creation Successful");
            dispatch(setCourse(response?.data?.updatedCourse));
        }catch(error){
            toast.error("Sub Section Creation Failed");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
} 




export function editSubSectionApi(formData,token){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",courseApi.EDIT_SUBSECTION_API,formData,{
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Sub Section Updation Failed");
                console.log(message);
                return;
            }
            toast.success("Sub Section Updation Successful");
            dispatch(setCourse(response?.data?.updatedCourse));
        }catch(error){
            toast.error("Sub Section Updation Failed");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
}



export function getCourseDetailsApi(courseId,setCourseDetails){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",courseApi.GET_COURSE_DETAILS_API,{courseId});
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Course Details Not Found");
                console.log(message);
                return;
            }
            setCourseDetails(response?.data?.getCourseDetails);
        }catch(error){
            toast.error("Course Details Not Found");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
} 


export function getEnrolledCoursesApi(token,setUserDetails){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("GET",courseApi.ENROLLED_COURSES_API,null,{
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Enrolled Course Details Not Found");
                console.log(message);
                return;
            }
            setUserDetails(response?.data?.userDetails);
        }catch(error){
            toast.error("Enrolled Course Details Not Found");
            console.log(error);
        }
        toast.dismiss(toastId);
    }
}



export function getFullCourseDetailsApi(courseId,token,setCompletedLectures,setCourseDetails,setSectionDetails,setSubSectionDetails,setTotalLectures,setLoading){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",courseApi.GET_FULL_COURSE_DETAILS_API,
                {
                    courseId
                },{
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Course Details Not Found");
                console.log(message);
                return;
            }
         dispatch(setCourseDetails(response?.data?.courseDetails));
         dispatch(setSectionDetails(response?.data?.courseDetails?.courseContent));
         let subSectionData = [];
         for(const key in response?.data?.courseDetails?.courseContent){
            for(const singleSubsection in response?.data?.courseDetails?.courseContent[key]?.subSection){
                subSectionData = [...subSectionData,response?.data?.courseDetails?.courseContent[key]?.subSection[singleSubsection]]
            }
         }
         dispatch(setSubSectionDetails(subSectionData));
         dispatch(setTotalLectures(subSectionData?.length));
         dispatch(setCompletedLectures(response?.data?.courseProgressCount));
        }catch(error){
            toast.error("Course Details Not Found");
            console.log(error);
        }
        toast.dismiss(toastId);  
        setLoading(false); 
    }
}



export function postRatingApi(courseId,rating,review,token,setCourseDetails,setLoading){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",courseApi.CREATE_RATING_API,
                {
                    courseId:courseId,
                    rating:rating,
                    review:review,
                }
               ,{
                Authorization:`Bearer ${token}`
            });
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Rating Not Created");
                console.log(message);
                return;
            }
         dispatch(setCourseDetails(response?.data?.courseDetails));
            toast.success("Rating Posted Successfully");
        }catch(error){
            toast.error("Rating Not Created");
            console.log(error);
        }
        toast.dismiss(toastId);  
        setLoading(false);
    }
}


export function getAllRatingsApi(setRatings){
    return async(dispatch)=>{
        try{
            const response = await apiConnector("GET",courseApi.GET_ALL_REVIEWS_API);
            const success = response?.data.success;
            const message = response?.data.message;
            if(!success){
                toast.error("Ratings Not Found");
                console.log(message);
                return;
            }
         setRatings(response?.data?.allRating);
        }catch(error){
            toast.error("Ratings Not Found");
            console.log(error);
        }  
    }
}