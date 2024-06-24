import { apiConnector } from "../apiConnector";
import { contactUsApi } from "../apis";
import toast from "react-hot-toast";
export function sendContactUsForm({firstName,lastName,email,countryCode,phoneNumber,message}){
return async()=>{
const toastId = toast.loading("Loading...");
try{
    const response = await apiConnector("POST",contactUsApi.CONTACT_US_FORM_API,{
        firstName,lastName,email,countryCode,phoneNumber,message
    });
    console.log("Contact Us Response : ",response);
    const success = response?.data?.success;
    const responseMessage = response?.data?.message;

    if(!success){
        toast.error("Form Not Sent");
        console.log(responseMessage);
    }

    toast.success("Form Sent Successfully");
}catch(error){
    toast.error("Form Not Sent");
    console.log(error);
}
toast.remove(toastId);
}
}