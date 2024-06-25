const Razorpay = require("razorpay");
const {instance} = require("../config/Razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const mongoose = require("mongoose");
const sendMail = require("../utils/mailSender");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");
require("dotenv").config();

exports.capturePayment = async(request,response)=>{
    const {courses} = request.body;
    const userId = request.user.id;
    if(!userId || !courses){
    return response.status(400).json({
    success:false,
    message:"All fields are required",
    })
 }
 let totalAmount = 0;
 for(const course in courses){
    let courseData;
    try{
        const courseId = courses[course];
        courseData = await Course.findById(courseId);
        if(!courseData){
            return response.status(400).json({
                success:false,
                message:"Course Not Found",
                })
        }

        const uid = new mongoose.Types.ObjectId(courseId);
        if(courseData?.studentsEnrolled.includes(uid)){
            return response.status(400).json({
                success:false,
                message:"Student Already Enrolled",
                })
        }
        totalAmount+=courseData?.price;
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in calculating total price",
            error,
            })
    }
 }
 const amount = totalAmount;
  const currency = "INR";
  var options = {
            amount:amount*100,
            currency:currency,
            receipt: `${Date.now()}${Math.floor(Math.random() * 1000000)}`,
        }
    try{
        const paymentResponse = await instance.orders.create(options);
        return response.status(200).json({
            success:true,
           message:paymentResponse,
        })
    }catch(error){
        return response.status(400).json({
                            success:false,
                            message:"Error in creating order",
                            error
                        })
    }
}


exports.verifyPayment = async(request,response)=>{
    const razorpay_order_id = request?.body?.razorpay_order_id;
    const razorpay_payment_id = request?.body?.razorpay_payment_id;
    const razorpay_signature = request?.body?.razorpay_signature;
    const courses = request?.body?.courses;
    const userId = request?.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return response.status(400).json({
            success:false,
            message:"Payment Failed",
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature =  crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
    
    if(expectedSignature === razorpay_signature){
        await enrollStudent(courses,userId,response);
        return response.status(200).json({
            success:true,
            message:"Payment Verified",
        });
    }
    return response.status(400).json({
        success:false,
        message:"Payment Not Verified",
    })
}

const enrollStudent = async(courses,userId,response)=>{
    try{
    if(!courses || !userId){
        return response.status(400).json({
            success:false,
            message:"Please Provide Data for course and user id",
        })
    }

    for(const course in courses){
        const courseId = courses[course];
        const enrolledCourse = await Course.findByIdAndUpdate(courseId,{$push:{studentsEnrolled:userId}},{new:true}); 
        if(!enrolledCourse){
            return response.status(400).json({
                success:false,
                message:"Course Not Found",
            })
        }
        const courseProgressCount = await CourseProgress.create({
            courseId:courseId,
            userId:userId,
        });
        const enrolledStudent = await User.findByIdAndUpdate(userId,{$push:{courses:courseId,courseProgress:courseProgressCount._id}},{new:true});
        const emailResponse = await sendMail(enrolledStudent.email,"Thanks For Purchasing Course",
            `Thanks For Purchasing Courses:
            Checkout my courses page for seeing all courses
            `
        )
    }
}catch(error){
    return response.status(400).json({
        success:false,
        message:"Enrollment Failed",
        error
    })
}
}






exports.sendPaymentSuccessEmail = async(request,response)=>{
    const {orderId,paymentId,amount} = request.body;
    const userId = request.user.id;
    if(!orderId || !paymentId ||!amount|| !userId){
        return response.status(400).json({
            success:false,
            message:"Please Provide All data",
        })
    }
    try{
        const userData = await User.findById(userId);
        await sendMail(userData?.email,"Payment Recieved",
            `Thank You ${userData?.firstName} for making payment.
            We Have Recieved Payment Of amount : Rs. ${amount/100}
            Order Id : ${orderId}
            Payment Id : ${paymentId}
            `
        )
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in Sending Mail",
            error
        })
    }
}
// exports.capturePayment = async(request,response)=>{
//     const {courseId} = request.body;
//     const userId = request.user.id;
//     if(!userId || !courseId){
//         return response.status(400).json({
//             success:false,
//             message:"All fields are required",
//         })
//     }
//     let course;
//     try{
//         course = await Course.findById(courseId);
//         if(!course){
//             return response.status(400).json({
//                 success:false,
//                 message:"Course Not Found",
//             })
//         }
//         const uid = new mongoose.Schema.ObjectId(userId);
//        const isEnrolled =  course.studentsEnrolled.includes(uid);
//        if(isEnrolled){
//         return response.status(400).json({
//             success:false,
//             message:"Student is already enrolled",
//         })
//        }
//     }catch(error){
//         return response.status(400).json({
//             success:false,
//             message:"Finding Course Error in Capture payment",
//         })
//     }

//     const amount = course.price;
//     const currency = "INR";
//     var options = {
//         amount:amount*100,
//         currency:currency,
//         receipt: `${Date.now()}${Math.floor(Math.random() * 1000000)}`,
//         notes:{
//             courseId :course._id,
//             userId : userId,
//         }
//     }
//     try{
//    const paymentResponse = instance.orders.create(options);
//    console.log(paymentResponse);
//    return response.status(200).json({
//     success:true,
//     message:"Order Created Successfully",
//     courseName : course.courseName,
//     courseDesc : course.courseDescription,
//     thumbnail:course.thumbnail,
//     orderId:paymentResponse.id,
//     currency:paymentResponse.currency,
//     amount : paymentResponse.amount,
//    })
//     }catch(error){
//         return response.status(400).json({
//             success:false,
//             message:"Error in creating order",
//         })
//     }
// };



// exports.verifySignature = async(request,response)=>{
//     const webHookSecret = process.env.WEBHOOK_SECRET;
//     const signature = request.headers["x-razorpay-signature"];
//     const shasum = crypto.createHmac("sha256",webHookSecret);
//     shasum.update(JSON.stringify(request.body));
//     const digest = shasum.digest("hex");
//     if(digest === signature){
//         console.log("Payment is authorized");
//         const {courseId,userId} = request.body.payload.payment.entity.notes;
//         try{
//             const enrolledCourse = await Course.findByIdAndUpdate(courseId,{$push:{studentsEnrolled:userId}},{new:true});
//             if(!enrolledCourse){
//                 return response.status(400).json({
//                     success:false,
//                     message:"Course Not Found",
//                 })
//             }
//             const enrolledStudent = await User.findByIdAndUpdate(userId,{$push:{courses:enrolledCourse._id}},{new:true});
//             console.log(enrolledStudent);

//             const emailResponse = sendMail(enrolledStudent.email,"Course Enrollement Successful",`Thank You For Enrollment in the course : ${enrolledCourse.courseName}`);
//             console.log(emailResponse);
//             return response.status(200).json({
//                 success:true,
//                 message:"Signature Verified and Course Added",
//             })
//         }catch(error){
//             return response.status(400).json({
//                 success:false,
//                 message:"Enrollment of course failed,please try again",
//             })
//         }
//     }
//     else{
//         return response.status(400).json({
//             success:false,
//             message:"Signature Verification Failed",
//         })
//     }
// }