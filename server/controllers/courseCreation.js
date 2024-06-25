const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
require("dotenv").config();
const {uploadImage} = require("../utils/imageUploader");
const Section = require("../models/Section");
const CourseProgress = require("../models/CourseProgress");
exports.createCourse = async(request,response)=>{
    try{
        const {courseName,courseDescription,whatYouWillLearn,price,category,tag,instructions,status="Draft"} = request.body;
        const image = request.files.image;
        if(!courseName || !courseDescription || !whatYouWillLearn ||!instructions|| !price || !category || !image||!tag){
            return response.status(400).json({
                success:false,
                message:"All fields required",
            })
        }
        const instructorId = request.user.id;
        if(!instructorId){
            return response.status(400).json({
                success:false,
                message:"instructor id not exist",
            })
        }
        const thumbnail = await uploadImage(image,process.env.FOLDER_NAME);
        const getCategory = await Category.findOne({name:category});
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorId,
            whatYouWillLearn,
            price,
            thumbnail:thumbnail.secure_url,
            category:getCategory._id,
            tag,
            status,
            instructions
        });
        const updatedCategory = await Category.findByIdAndUpdate(getCategory._id,{$push:{course:newCourse._id}},{new:true});
        const updatedUser = await User.findByIdAndUpdate(instructorId,{$push:{courses:newCourse._id}},{new:true}).populate("additionalDetails").populate({
            path:"courses",
            populate : {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec();
        const createdCourse = await Course.findById(newCourse._id).populate("category").populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        return response.status(200).json({
            success:true,
            message:"Course Created Successfully",
            updatedCategory,
            updatedUser,
            createdCourse
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Course Creation Failed",
            error:error,
        })
    }
}


exports.showAllCourses = async(request,response)=>{
    try{
        const getAllCourses = await Course.find({}) .populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("ratingAndReview")
        .populate("category")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        if(!getAllCourses){
            return response.status(400).json({
                success:false,
                message:"No valid courses",
            })
        }
        return response.status(200).json({
            success:true,
            message:"All Courses fetch successful",
            getAllCourses
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in showing all courses",
        })
    }
}



exports.showCourse = async(request,response)=>{
    try{
        const {courseId} = request.body;
        const getCourseDetails = await Course.findById(courseId)
                                .populate({
                                    path:"instructor",
                                    populate:{
                                        path:"additionalDetails",
                                    }
                                })
                                .populate("ratingAndReview")
                                .populate("category")
                                .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection"
                                    }
                                }).exec();
    if(!getCourseDetails){
        return response.status(400).json({
            success:false,
            message:"Course not found",
        })
    }
    return response.status(200).json({
        success:true,
        message:"Course details fetched successfully",
        getCourseDetails
    })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in finding selected course",
        })
    }
}



exports.editCourse = async(request,response)=>{
    try{
        const {category,courseId,...updatedFields} = request.body;
        const course = await Course.findById(courseId).populate("category");
        if(!course){
            return response.status(400).json({
                success:false,
                message:"Course Not Found ",
            })
        }
        if(category){
        const oldCategory = course.category._id;
        const updatedOldCategory = await Category.findByIdAndUpdate(oldCategory,{$pull:{course:courseId}},{new:true});
        const newCategory = await Category.findOneAndUpdate({name:category},{$push:{course:courseId}},{new:true});
        course.category = newCategory._id;
    }
        if(request.files && request.files.image){
            const image = request.files.image;
            const thumbnail = await uploadImage(image,process.env.FOLDER_NAME);
            course.thumbnail = thumbnail.secure_url;
        }
        Object.entries(updatedFields).map(entry=>{
            course[entry[0]] = entry[1];
        })
        await course.save();
        const updatedCourse = await Course.findById(courseId).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("ratingAndReview")
        .populate("category")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        return response.status(200).json({
            success:true,
            message:"Course Updation Successful",
            updatedCourse,
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Course Updation Failed",
            error:error,
        })
    }
}



exports.deleteCourse = async(request,response)=>{
    try{
    const {courseId,categoryId} = request.body;
    const userId = request.user.id;
    const course = await Course.findById(courseId);
    if(!course){
        return response.status(400).json({
            success:false,
            message:"Course Not Found ",
        })
    }
    course?.courseContent.map(async(section)=>{
        await Section.findByIdAndDelete(section?._id);
    })
    const updatedUser = await User.findByIdAndUpdate(userId,{$pull:{courses:courseId}},{new:true}).populate("additionalDetails")
    .populate({
        path: "courses",
        populate: [
        {
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        },
        {
            path: "category"
        },
        {
            path: "instructor"
        }
    ]
    })
    .exec();
    const updatedCategory = await Category.findByIdAndUpdate(categoryId,{$pull:{course:courseId}},{new:true}).populate("course");
    await Course.findByIdAndDelete(courseId);
    return response.status(200).json({
        success:true,
        message:"Course Deletion Successful",
        updatedUser,
        updatedCategory
    })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Course Deletion Failed",
            error:error,
        })
    }
} 


exports.getEnrolledCourses = async(request,response)=>{
    try{
        const userId = request.user.id;
        const userDetails = await User.findById(userId).populate("additionalDetails").populate({
            path:"courses",
            populate : {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).populate("courseProgress").exec();
        if(!userDetails){
            return response.status(400).json({
                success:false,
                message:"User Not Found",
                error:error,
            })
        }
        return response.status(200).json({
            success:true,
            message:"Enrolled Course Found",
            userDetails
        })
    }catch(error){
    return response.status(400).json({
            success:false,
            message:"Enrolled Course Not Found",
            error:error,
        })
    }
}




exports.getFullCourseDetails = async(request,response)=>{
    try{
        const {courseId} = request.body;
        const userId = request.user.id;

        if(!courseId || !userId){
            return response.status(400).json({
                success:false,
                message:"Please Provide All Details",
            })
        }

        const courseDetails = await Course.findById(courseId).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("ratingAndReview")
        .populate("category")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        if(!courseDetails){
            return response.status(400).json({
                success:false,
                message:"Course Not Found",
            })
        }
        
        const courseProgressCount = await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        });
        return response.status(200).json({
            success:true,
            message:"Fetching Successful",
            courseDetails: courseDetails,
            courseProgressCount: courseProgressCount?courseProgressCount?.completedVideos : [],
        })
    }catch(error){
        console.log("Error in get full course details : ",error);
        return response.status(400).json({
            success:false,
            message:"Error in fetching course detail",
            error:error
        })
    }
}



exports.InstructorPieDetails= async(request,response)=>{
    try{
        const userId = request.user.id;
        const userDetails = await User.findById(userId).populate("additionalDetails").populate({
            path:"courses",
            options: { sort: { createdAt: -1 } },
            populate : [{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            },{
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                }
            },
            {
            path : "ratingAndReview"
            },{
            path:"category"
            }
            ,{
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        ]
        }).exec();

        if(!userDetails){
            return response.status(400).json({
                success:false,
                message:"Instructor Not Found",
            })
        }

        return response.status(200).json({
            success:true,
            message:"User Fetched Successfully",
            instructorDetails:userDetails
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in fetching instructor detail",
            error:error
        })
    }
}