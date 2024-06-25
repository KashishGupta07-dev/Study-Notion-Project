const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImage} = require("../utils/imageUploader");
require("dotenv").config();
exports.editProfile = async(request,response)=>{
    try{
        const{firstName,lastName,gender,dateOfBirth,about="",contactNumber} = request.body;
        const userId = request.user.id;
        if(!firstName||!gender || !dateOfBirth || !contactNumber || !userId){
            return response.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{firstName:firstName,lastName:lastName},{new:true}).populate("additionalDetails").populate({
            path:"courses",
            populate : {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec();
        const profileId = updatedUser.additionalDetails;
        //findByIdAndUpdate se bhi kr skte new method
        const profile = await Profile.findById(profileId);
        profile.gender = gender;
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
       await profile.save();
       const user = await User.findById(userId).populate("additionalDetails").populate({
        path:"courses",
        populate : {
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }
    }).exec();
       return response.status(200).json({
        success:true,
        message:"Profile Updated Successfully",
        user,
        profile,
    })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while editing profile",
            error:error,
        })
    }
}




exports.deleteProfile = async(request,response)=>{
    try{
        const userId = request.user.id;
        const user = await User.findById(userId);
        if(!user){
            return response.status(400).json({
                success:false,
                message:"User Not Found",
            })
        }
        if(user.accountType === "Student"){
            for (const courseId of user.courses) {
                await Course.findByIdAndUpdate(courseId, { $pull: { studentsEnrolled: user._id } },{new:true});
            }
        }
        await Profile.findByIdAndDelete(user.additionalDetails);
        await User.findByIdAndDelete(userId);
        return response.status(200).json({
            success:true,
            message:"User Deleted Successfully",
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while deleting user",
        })
    }
}


exports.getUserDetails = async(request,response)=>{
    try{
        const userId = request.user.id;
        if(!userId){
            return response.status(400).json({
                success:false,
                message:"Userid not found",
            })
        }
        const allUserDetails = await User.findById(userId).populate("additionalDetails").populate({
            path:"courses",
            populate : {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec();
        if(!allUserDetails){
            return response.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        return response.status(200).json({
            success:true,
            message:"User Details Fetched successfully",
                allUserDetails
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while finding user details",
        })
    }
}



exports.updateProfilepic = async(request,response)=>{
    try{
        const userId = request.user.id;
        const image = request.files.displayPicture;
        if(!userId || !image){
            return response.status(400).json({
                success:false,
                message:"All details required",
            })
        }
        const user = await User.findById(userId);
        if(!user){
            return response.status(400).json({
                success:false,
                message:"User not found",
            })
        }
        const uploadedImage = await uploadImage(image,process.env.FOLDER_NAME)
        const updatedUser = await User.findByIdAndUpdate(userId,{image:uploadedImage.secure_url},{new:true}).populate({
            path:"courses",
            populate : {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        });
        return response.status(200).json({
            success:true,
            message:"Profile picture updated successfully",
            updatedUser,
            cookies:request.cookies
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while updating profile picture",
            error:error,
        })
    }
}