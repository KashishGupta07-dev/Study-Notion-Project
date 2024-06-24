const Category = require("../models/Category");
const Course = require("../models/Course");
exports.createCategory = async(request,response)=>{
    try{
        const {name,description} = request.body;
        if(!name || !description){
            return response.status(400).json({
                success:false,
                message:"All fields required",
            })
        }
        const createdCategory = await Category.create({
            name,description
        });
        console.log(createdCategory);
        return response.status(200).json({
            success:true,
            message:"Category Created Successfully",
        })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in Category Creation",
        })
    }
}

exports.showAllCategories = async(request,response)=>{
    try{
    const allCategories = await Category.find({},{name:true,description:true});
    return response.status(200).json({
        success:true,
        message:"All Categories Returned Successfully",
        allCategories
    })
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in Showing All Categories",
        })
    }
}

exports.categoryPageDetails = async(request,response)=>{
    try{
        const {categoryName} = request.body;
        const selectedCategory = await Category.findOne({name:categoryName}).populate({
            path:"course",
            populate:[{
                path:"instructor",
                populate:{
               path:"additionalDetails",
                }
            },
            {
            path:"ratingAndReview",
            },
            {
                path:"category",
            },
            {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        ],
        }).exec();
        const categoryId = selectedCategory._id;
        if(!selectedCategory){
            return response.status(400).json({
                success:false,
                message:"Data not found of the selected category",
            })
        }
        const differentCategory = await Category.find({_id:{$ne:categoryId}}).populate({
            path:"course",
            populate:[{
                path:"instructor",
                populate:{
               path:"additionalDetails",
                }
            },
            {
            path:"ratingAndReview",
            },
            {
                path:"category",
            },
            {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        ],
        }).exec();
        console.log("Different Category : ",differentCategory);
        const bestCourses = await Course.aggregate([
            {
                $addFields:{
                    studentsEnrolledCount:{$size:"$studentsEnrolled"}
                },
            },
            {
                $sort:{
                    studentsEnrolledCount:-1,
                }
            },
        ]);
        let topSellingCourses = [];
        for(const courses in bestCourses){
            const course = await Course.findById(bestCourses[courses]._id).populate({
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
            topSellingCourses.push(course);
        }
        return response.status(200).json({
            success:true,
            message:"Selected Category Fetch Successful",
            selectedCategory,
            differentCategory,
            topSellingCourses,
        })

    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error while fetching selected category",
        })
    }
}