import { apiConnector } from "../apiConnector";
import { paymentApi } from "../apis";
import toast from "react-hot-toast";
import RazorpayLogo from "../../assets/Logo/rzp_logo.png"
import {setCart,setNumberOfItems} from "../../reducers/slices/CartSlice"
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}


export async function buyCourse(courses, token,userDetails,navigate,dispatch) {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed too load");
      return;
    }

    const orderResponse = await apiConnector(
      "POST",
      paymentApi.CAPTURE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("Order Response : ",orderResponse);
    if (!orderResponse?.data?.success) {
      toast.error("Capture Payment Failed");
      console.log(orderResponse?.data?.message);
      return;
    }

    var options = {
      key: process.env.RAZORPAY_KEYID,
      amount: orderResponse.data.message.amount, 
      currency: orderResponse.data.message.currency,
      order_id:orderResponse.data.message.id,
      name: "Study Notion",
      description: "Thank You For Buying Course",
      image: RazorpayLogo,
      prefill: {
        name: `${userDetails?.firstName}`,
        email: userDetails?.email,
    },

    handler:function(response){
      console.log("Response  : ",response);
        sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
        dispatch(verifyPayment({...response,courses},token,navigate));
    }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response){
      toast.error("Oops Payment Failed");
      console.log("Payment Failed Error : ",response);
    })
    paymentObject.open();
  } catch (error) {
    console.log("Payment Api Error : ",error);
    toast.error("Could Not Make Payment");
  }
  toast.dismiss(toastId);
}


async function sendPaymentSuccessEmail(response,amount,token){
    try{
         await apiConnector(
            "POST",
            paymentApi.SEND_MAIL_API,
            { 
                orderId:response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount:amount
             },
            { Authorization: `Bearer ${token}`,  }
          );
    }catch(error){
        console.log("Payment Success Email Error : ",error);
    }
}

function verifyPayment(bodyData,token,navigate){
    return async(dispatch)=>{
    const toastId = toast.loading("Verifying Payment ...");
    try{
        const response = await apiConnector("POST",paymentApi.VERIFY_PAYMENT_API,bodyData,{
            Authorization: `Bearer ${token}`
        });
        if(!response.data.success){
            toast.error("Verifying Payment Failed");
            console.log(response?.data?.message);
            return;
        }
        toast.success("Payment Successful");
        navigate("/dashboard/enrolled-courses");
        dispatch(setCart([]));
        dispatch(setNumberOfItems(0));
        localStorage.removeItem("cart");
        localStorage.removeItem("items");
    }catch(error){
        toast.error("Payment Verify Error");
        console.log("Payment Verification Failed : ",error);
    }
    toast.dismiss(toastId);
}
}