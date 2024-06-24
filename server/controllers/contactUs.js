const ContactUs = require("../models/ContactUs");

exports.contactUsController = async(request,response)=>{
    try{
      const {firstName,lastName,email,countryCode,phoneNumber,message} = request.body;
      if(!firstName || !email || !countryCode || !phoneNumber || !message){
        return response.status(400).json({
            success:false,
            message:"All Fields Required",
        })
      }

      const contactUsDetails = await ContactUs.create({
        firstName,lastName,email,message,countryCode,phoneNumber
      });
      return response.status(200).json({
        success:true,
        message:"Thank You For Contacting Us",
        contactUsDetails,
      })
    }catch(error){
     console.log(error);
     return response.status(400).json({
        success:false,
        message:"Error in contact us",
        error,
    })
    }
}