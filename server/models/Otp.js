const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    otp:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300
    }
});
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Email From Study Notion",`${otp}`);
    }catch(error){
        console.log("Error while sending mail : ",error);
    }
}
otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports = mongoose.model("OTP",otpSchema);