const Section = require("../models/Section");
const Course = require('../models/Course');
exports.createSection = async(request,response)=>{
    try{
        const {sectionName,courseId} = request.body;
        if(!sectionName || !courseId){
            return response.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const createdSection = await Section.create({
            sectionName,
        });
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push:{courseContent:createdSection._id}},{new:true})
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
        return response.status(200).json({
            success:true,
            message:"Section Created Successfully",
            createdSection,
            updatedCourse,
        });
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while creating section",
        })
    }
}




exports.editSection = async(request,response)=>{
    try{
        const {sectionName,sectionId,courseId} = request.body;
        if(!sectionName || !sectionId || !courseId){
            return response.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const section = await Section.findById(sectionId);
        if(!section){
            return response.status(400).json({
                success:false,
                message:"Section Not Found",
            })
        }
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});
        const updatedCourse = await Course.findById(courseId)
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
        return response.status(200).json({
            success:true,
            message:"Section updated successfully",
            updatedSection,
            updatedCourse
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in editing of section",
        })
    }
}



exports.deleteSection = async(request,response)=>{
    try{
        const {sectionId,courseId} = request.body;
        if(!sectionId || !courseId){
            return response.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const section = await Section.findById(sectionId);
        if(!section){
            return response.status(400).json({
                success:false,
                message:"Section Not Found",
            })
        }
        await Section.findByIdAndDelete(sectionId);
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$pull:{courseContent:sectionId}},{new:true}) .populate({
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
            message:"Section Deleted Successfully",
            updatedCourse,
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while deleting section",
        })        
    }
}