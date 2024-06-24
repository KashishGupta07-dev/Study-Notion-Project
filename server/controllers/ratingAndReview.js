const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const monoose = require("mongoose");
const { default: mongoose } = require("mongoose");
exports.createRating = async(request,response)=>{
    try{
        const {rating,review,courseId} = request.body;
        const userId = request.user.id;
        const checkStudentEnrollment = await Course.findById({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}}); //other ways h
        const checkStudentAlreadyGivenRating = await RatingAndReview.findOne({user:userId,course:courseId});
        if(!checkStudentEnrollment){
            return response.status(400).json({
                success:false,
                message:"Student is not enrolled in this course",
            })
        }if(checkStudentAlreadyGivenRating){
                return response.status(400).json({
                    success:false,
                    message:"Course is already reviewed by the student",
                })
        }
        if(!rating || !review || !courseId){
            return response.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const createRating = await RatingAndReview.create({
            user: userId,
            course:courseId,
            rating,
            review
        })
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReview:createRating._id}},{new:true}).populate({
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
        }).exec();;
        return response.status(200).json({
            success:true,
            message:"Rating and review created",
            updatedCourse,
            createRating
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while creating rating and review",
        })
    }
}



exports.getAverageRating = async(request,response)=>{
    try{
        const {courseId} = request.body;
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId.createFromHexString(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating : {$avg:"$rating"},
                }
            }
        ])
        if(result.length>0){
        return response.status(200).json({
            success:true,
            message:`average rating is : ${result[0].averageRating}`,
        })
    }
    return response.status(400).json({
        success:false,
        message:"Sorry,average rating is 0 no review is given till now",
    })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in getting average rating",
        })
    }
}


exports.getAllRating = async(request,response)=>{
    try{
        const allRating = await RatingAndReview.find({}).sort({rating:-1}).
                                        populate({
                                            path:"user",
                                            select:"firstName lastName email image",
                                            }).populate({
                                                path:"course",
                                                select:"courseName",
                                            }).exec();
      if(!allRating){
        return response.status(400).json({
            success:false,
            message:"There is no rating",
        })
      }
      return response.status(200).json({
        success:true,
        message:"all rating fetched successfully",
        allRating,
      })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while fetching all rating",
        })
    }
}