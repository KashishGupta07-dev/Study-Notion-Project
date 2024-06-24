const mongoose = require("mongoose");
const sendMail = require("../utils/mailSender");
const ContactUsSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
    type:String,
    },
    email:{
        type:String,
        required:true,
    },
    countryCode:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})

ContactUsSchema.post("save",async function(){
    await sendMail(this.email,"Thank You For Contacting Us","We Have Recieved Your Message Thank You For Contact Us We Will Reach Out To You Very Soon");
});


module.exports = mongoose.model("ContactUs",ContactUsSchema);
