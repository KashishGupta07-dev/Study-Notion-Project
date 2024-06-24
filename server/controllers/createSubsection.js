const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImage} = require("../utils/imageUploader");
const Course = require("../models/Course");
require("dotenv").config();


exports.createSubSection = async(request,response)=>{
    try{
        const {title,timeDuration,description,sectionId,courseId} = request.body;
        const video = request.files.video;
        if(!title || !timeDuration || !description || !sectionId || !video){
            return response.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        try{
        const resultAfterUpload = await uploadImage(video,process.env.FOLDER_NAME);
        const createdSubsection = await SubSection.create({
            title,timeDuration,description,videoUrl:resultAfterUpload.secure_url,
        });
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$push:{subSection:createdSubsection._id}},{new:true}).populate("subSection").exec();
        console.log("Section : ",updatedSection);
        console.log("Course Id : ",courseId);
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
            message:"Subsection created successfully",
            updatedSection,
            updatedCourse
        })
        }catch(error){
            return response.status(400).json({
                success:false,
                message:"Uploading video to cloudinary unsuccessful",
            })
        }

    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while creating subsection",
            error:error,
        })
    }
}


exports.editSubSection = async(req,res)=>{
    try {
        const { subSectionId, title, description,timeDuration,courseId } = req.body
        const subSection = await SubSection.findById(subSectionId)
    
        if (!subSection) {
          return res.status(404).json({
            success: false,
            message: "SubSection not found",
          })
        }
    
        if (title !== undefined) {
          subSection.title = title
        }
    
        if (description !== undefined) {
          subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
          const video = req.files.video
          const uploadDetails = await uploadImage(
            video,
            process.env.FOLDER_NAME
          )
          subSection.videoUrl = uploadDetails.secure_url
          subSection.timeDuration = timeDuration?timeDuration:`${uploadDetails.duration}`
        }
        await subSection.save()
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
        return res.json({
          success: true,
          message: "Section updated successfully",
          subSection,
          updatedCourse
        })
      } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "An error occurred while updating the section",
        })
      }
}



exports.deleteSubSection = async(request,response)=>{
    try{
        const {subSectionId,sectionId} = request.body;
        if(!sectionId || !subSectionId){
            return response.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return response.status(400).json({
                success:false,
                message:"SubSection Not Found",
            })
        };
        await SubSection.findByIdAndDelete(subSectionId);
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true});
        return response.status(200).json({
            success:true,
            message:"Subsection deleted successfully",
            updatedSection,
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while deleting subsection",
        })
    }
}