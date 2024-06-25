import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setLoading } from "../../reducers/slices/AuthSlice";
import { authApi } from "../apis";
import { setSignupData,setToken } from "../../reducers/slices/AuthSlice";
import { setUser } from "../../reducers/slices/ProfileSlice";
export function sendOtp(email,navigate){
    return async(dispatch)=>{
       const toastId =  toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",authApi.SEND_OTP_API,{
                email:email,
            })
            const success = response?.data?.success;
            const message = response?.data?.message;
            if(!success){
                toast.error("Otp Not Sent Because Success")
                console.log(message);
                navigate("/signup");
                return;
            }
            toast.success("Otp sent successfully")
            navigate("/verify-email");
        }catch(error){
            if(error?.response?.data?.exist){
                navigate("/login");
                toast.error("User Already Exist");
            }
            else{
            console.log("Error in sending otp : ",error);
            toast.error("Otp Not Sent");
            navigate("/signup")
            }
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function signupUser(firstName,lastName,email,password,confirmPassword,accountType,otp,navigate){
    return async(dispatch)=>{
        const toastId =  toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",authApi.SIGNUP_API,{
                firstName,lastName,email,password,confirmPassword,accountType,otp
            })
            const success = response?.data?.success;
            const message = response?.data?.message;
            if(!success){
                toast.error("Signup Unsuccessful")
                console.log(message);
                dispatch(setSignupData(null));
                navigate("/signup");
            }
            toast.success("Signup Successful");
            navigate("/login");
        }catch(error){
            console.log("Error in sign up : ",error);
            dispatch(setSignupData(null));
            toast.error("Signup Unsuccessful");
            navigate("/signup")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function loginUser(email,password,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",authApi.LOGIN_API,{
                email,password
            });
            const success = response?.data?.success;
            const message = response?.data?.message;
            if(!success){
                toast.error("User Does Not Exist");
                console.log(message);
                navigate("/signup");
            }
            toast.success("Login Successful");
            dispatch(setToken(response?.data?.token));
            dispatch(setUser(response?.data?.user));
            localStorage.setItem("token",response?.data?.token);
            localStorage.setItem("user",JSON.stringify(response?.data?.user));
            navigate("/dashboard/my-profile");
        }catch(error){
            toast.error("Login Unsuccessful");
                console.log(error);
                navigate("/login");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export function generateResetPasswordToken(email,navigate,setMailSent,setResetToken){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",authApi.RESET_PASSWORD_TOKEN_API,{
                email
            });
            const success = response?.data?.success;
            const message = response?.data?.message;
            if(!success){
            console.log("Error in generating token : ",message);
            toast.error("Resetting Password Failed");
            navigate("/login");
            }
            toast.success("Reset Link Sent To Mail");
            setMailSent(true);
            dispatch(setResetToken(true));
        }catch(error){
            console.log("Error in generating token : ",error);
            toast.error("Resetting Password Failed");
            navigate("/login")
        }
        toast.remove(toastId);
        dispatch(setLoading(false));
    }
}



export function resetPasswordFromToken(password,confirmPassword,token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",authApi.RESET_PASSWORD_API,{
                password,confirmPassword,token
            });
            const success = response?.data?.success;
            const message = response?.data?.message;
            if(!success){
            console.log("Error in Reset Password : ",message);
            toast.error("Resetting Password Failed");
            navigate("/login");
            }
            toast.success("Password Reset Successful");
            navigate("/login")
        }catch(error){
            console.log("Error in Reset Password : ",error);
            toast.error("Resetting Password Failed");
            navigate("/login")
        }
        toast.remove(toastId);
        dispatch(setLoading(false));
    }
}


export function logoutHandler(navigate){
    return (dispatch)=>{
    dispatch(setSignupData(null));
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    navigate("/");
    }
  }


