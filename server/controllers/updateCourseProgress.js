const CourseProgress = require("../models/CourseProgress");
exports.pushCompletedVideos = async(request,response)=>{
    try{
    const {courseId,subSectionId} = request.body;
    const userId = request.user.id;
    if(!subSectionId || !courseId){
        return response.status(400).json({
            success:false,
            message:"All fields are required",
        })
    }
    const getCourseProgress = await CourseProgress.findOneAndUpdate({userId:userId,courseId:courseId},{
        $push:{
            completedVideos:subSectionId,
        }
    },{new:true}
    ).populate("userId").populate("courseId");
    if(!getCourseProgress){
        return response.status(400).json({
            success:false,
            message:"Course Progress Not Found",
        })
    }
    return  response.status(200).json({
        success:true,
        message:"Course Progress Updated Successfully",
        getCourseProgress,
    })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Course Progress Updation Error",
        })
    }
}


exports.getCourseProgress = async(request,response)=>{
    try{
        const {courseId} = request.body;
        const userId = request.user.id;
        if(!courseId){
            return response.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const getCourseProgress = await CourseProgress.findOne({userId:userId,courseId:courseId} ).populate("userId").populate("courseId");
        if(!getCourseProgress){
            return response.status(400).json({
                success:false,
                message:"Course Progress Not Found",
            })
        }
        return  response.status(200).json({
            success:true,
            message:"Course Progress Fetch Successfully",
            getCourseProgress,
        })
        }catch(error){
            return response.status(400).json({
                success:false,
                message:"Course Progress Fetch Error",
            })
        }   
}