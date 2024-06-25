const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
exports.resetPasswordToken = async(request,response)=>{
    try{
        const {email} = request.body;
        const isUserExist = await User.findOne({email:email});
        if(!isUserExist){
            return response.status(400).json({
                success:false,
                message:"User not registered with us",
            })
        };
        const token = crypto.randomBytes(20).toString("hex");
        const url = `http://localhost:3000/reset-password/${token}`;
        const updatedUser = await User.findOneAndUpdate({email:email},{token:token,tokenExpiresIn:Date.now()+5*60*1000},{new:true});
      await  mailSender(email,"Password Reset Link",`Password Reset Link : ${url}`);
        return response.status(200).json({
            success:true,
            message:"Mail Sent Successfully for password reset",
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in sending mail for password reset",
            token,
        })
    }
}

exports.resetPassword = async(request,response)=>{
    try{
        const {password,confirmPassword,token} = request.body;
        if(password!==confirmPassword){
            return response.status(401).status({
                success:false,
                message:"password and confirm password not matching",
            })
        }
        const user = await User.findOne({token:token});
        if(!user){
            return response.status(400).json({
                success:false,
                message:"invalid token please generate token",
            })
        }
        if(Date.now()>user.tokenExpiresIn){
            return response.status(400).json({
                success:false,
                message:"Token Expired please regenerate token",
            });
        };
        const newPassword = await bcrypt.hash(password,10);
        const updatedUser = await User.findOneAndUpdate({token:token},{password:newPassword},{new:true});
        return response.status(200).json({
            success:true,
            message:"Password Reset Successfully",
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in password reset , please try again!!",
        })
    }
}
