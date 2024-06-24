const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
        trim:true,
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }]
});
module.exports = mongoose.model("Category",categorySchema);