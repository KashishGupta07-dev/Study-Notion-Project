import { apiConnector } from "../apiConnector";
import { profileApi } from "../apis";
import toast from "react-hot-toast";
import { setUser } from "../../reducers/slices/ProfileSlice";
import { logoutHandler } from "./authApi";
export function updateProfilePicture(formData,token,setPreviewImage){
    return async(dispatch)=>{               
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT",profileApi.UPDATE_PROFILE_PICTURE_API,formData,{
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            });
            const success = response?.data?.success;
            const message = response?.data?.message;
            const image = response?.data?.updatedUser?.image;
            if(!success){
                console.log(message);
                toast.error("Profile Picture Not Updated");
                return;
            }
            dispatch(setUser({...response?.data?.updatedUser,image:image}));
            localStorage.setItem("user",JSON.stringify(response?.data?.updatedUser));
            toast.success("Profile Picture Updated Successfully");
        }catch(error){
            console.log(error);
            toast.error("Profile Picture Not Updated");
        }
        toast.remove(toastId);
        setPreviewImage(null);
    }
}


export function updateProfile({firstName,lastName,dateOfBirth,gender,contactNumber,about,token}){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT",profileApi.UPDATE_PROFILE_API,{
                firstName,lastName,dateOfBirth,gender,contactNumber,about
            },{
                "Authorization": `Bearer ${token}`
            });
            const success = response?.data?.success;
            const message = response?.data?.message;
            if(!success){
                console.log(message);
                toast.error("Profile Not Updated");
                return;
            }
            dispatch(setUser({...response?.data?.user}));

            localStorage.setItem("user",JSON.stringify(response?.data?.user));
            toast.success("Profile Updated Successfully");
        }catch(error){
            console.log(error);
            toast.error("Profile Not Updated");
        }
        toast.remove(toastId);
    }
}



export function updatePassword({oldPassword,newPassword,confirmNewPassword,token,navigate}){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT",profileApi.UPDATE_PASSWORD_API,{
                oldPassword,newPassword,confirmNewPassword
            },{
                Authorization:`Bearer ${token}`
            });
            const success = response?.data?.success;
            const message = response?.data?.message;
            if(!success){
            console.log("Error in Changing Password : ",message);
            toast.error("Change Password Failed");
            navigate("/dashboard/my-profile");
            return;
            }
            toast.success("Password Change Successful");
            dispatch(setUser(response?.data?.updatedUser));
            localStorage.setItem("user",JSON.stringify(response?.data?.updatedUser));
        }catch(error){
            console.log("Error in Changing Password : ",error);
            toast.error("Change Password Failed");
            navigate("/dashboard/my-profile");
        }
        toast.remove(toastId);
    }
}


export function deleteProfile(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("DELETE",profileApi.DELETE_PROFILE_API,null,{
                Authorization:`Bearer ${token}`,
            });
            const success = response?.data?.success;
            const message = response?.data?.message;
            if(!success){
            console.log("Error in Deleting Profile : ",message);
            toast.error("Profile Deletion Failed");
            return;
            }            
            dispatch(logoutHandler(navigate));
            toast.success("Profile Deleted Successfully");
        }catch(error){
            console.log("Error in Deleting Profile : ",error);
            toast.error("Profile Deletion Failed");
        }
        toast.remove(toastId);
    }
}


export async function getInstructorDetailsApi(token,setInstructorDetails,setLoading){
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET",profileApi.GET_INSTRUCTOR_DETAILS_API,null,{
            Authorization:`Bearer ${token}`,
        });
        const success = response?.data?.success;
        const message = response?.data?.message;
        if(!success){
        console.log("Error in Fetching Profile : ",message);
        toast.error("Profile Fetched Failed");
        return;
        }      
        setInstructorDetails(response?.data?.instructorDetails);
    }catch(error){
        console.log("Error in Fetching Profile : ",error);
        toast.error("Profile Fetched Failed");
    }
    toast.remove(toastId);
    setLoading(false);
}