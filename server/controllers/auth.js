const OTP = require("../models/Otp");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
exports.sendOtp = async(request,response)=>{
    try{
    const {email} = request.body;
    const isUserExist = await User.findOne({email:email});
    if(isUserExist){
        return response.status(400).json({
            success:false,
            message:"User Already Exist",
            exist:true,
        })
    };
    var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    let result = await OTP.findOne({otp:otp});
    while(result){
        otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        result = await OTP.findOne({otp:otp});
    }
    const createdOtp = await OTP.create({
        email,otp
    })
    return response.status(200).json({
        success:true,
        message:"Otp sent successfully",
        createdOtp,
        otp:`${otp}`,
    })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while sending otp"
        })
    }
}


exports.signup = async(request,response)=>{
    try{
    const {firstName,lastName,email,password,confirmPassword,accountType,otp} = request.body;
    if(!firstName || !lastName || !email ||!password ||!confirmPassword || !otp){
        return response.status(403).json({
            success:false,
            message:"All Fields Are Required",
        })
    }
    if(password!==confirmPassword){
        return response.status(400).json({
            success:false,
            message:"Password and Confirm Password not same",
        })
    }
    const isUserExist = await User.findOne({email:email});
    if(isUserExist){
        return response.status(400).json({
            success:false,
            message:"User Already Exist",
        })
    };
    const actualOtp = await OTP.find({email:email}).sort({createdAt:-1}).limit(1);
    if(actualOtp.length === 0){
        return response.status(400).json({
            success:false,
            message:"Otp Not Found in database",
        })
    }
    if(otp!==actualOtp[0].otp){
        return response.status(400).json({
            success:false,
            message:"Otp Not Matched",
        })
    }
    const newPassword = await bcrypt.hash(password,10);
    const profileDetails = {
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    }
    const additionalDetails = await Profile.create(profileDetails);
    const createdUser = await User.create({
        firstName,
        lastName,email,
        password:newPassword,
        accountType,
        additionalDetails:additionalDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    });
    return response.status(200).json({
        success:true,
        message:"User registered Successfully",
        createdUser,
    });
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"User registeration failed",
            error : error,
        });
}
}

exports.login = async(request,response)=>{
    try{
        const {email,password} = request.body;
        if(!email || !password){
            return response.status(403).json({
                success:false,
                message:"All Fields Are Required",
            })
        }
        const user =  await User.findOne({ email: email })
        .populate("additionalDetails")
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
        if(!user){
            return response.status(403).json({
                success:false,
                message:"User Doesn't exist",
            })
        }
        if(!await bcrypt.compare(password,user.password)){
            return response.status(403).json({
                success:false,
                message:"Password Didn't match",
            })
        }
        const payload = {
            id:user._id,
            email:user.email,
            role:user.accountType,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        })
        user.password = undefined;
        user.token = token;
        return response.cookie("token",token,{
            expires: new Date(Date.now() + 2*60*60*1000),
            httpOnly:true,
        }).status(200).json({
            success:true,
            message:"Login Successful",
            token,
            user
        });
    }catch(error){
        return response.status(403).json({
            success:false,
            message:"Login Failed,please try again!!",
            error
        })
    }
}



exports.changePassword = async(request,response)=>{
    try{
        const {oldPassword,newPassword,confirmNewPassword} = request.body;
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return response.status(403).json({
                success:false,
                message:"All Fields Are Required",
            })
        }
        const email = request.user.email;
        const user = await User.findOne({email:email});
        const checkPassword = await bcrypt.compare(oldPassword,user.password);
        if(!checkPassword){
            return response.status(403).json({
                success:false,
                message:"Old Password Didn't match",
            })
        }
        const hashNewPassword = await bcrypt.hash(newPassword,10);
        const updatedUser = await User.findOneAndUpdate({email:email},{password:hashNewPassword},{new:true}).populate("additionalDetails").populate({
            path:"courses",
            populate : {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        }).exec();
       const emailResponse = await mailSender(email,"Password Udated Successfully",`Password updated successfully for the email : ${email} in the study notion platform`);
       return response.status(200).json({
            success:true,
            message:"Password Changed Successfully",
            updatedUser,
        })
    }catch(error){
        return response.status(403).json({
            success:false,
            message:"Error in changing password",
        })
    }
}