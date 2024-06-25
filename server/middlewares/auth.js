const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = async(request,response,next)=>{
    try{
        const token = request.header("Authorization").replace("Bearer ","") ||  request.cookies.token || request.body.token  ;
        if(!token){
        return response.status(400).json({
            success:false,
            message:"Token Not Found",
        });
    }
    try{
    const payload = jwt.verify(token,process.env.JWT_SECRET);
        request.user = payload,
        next();
}catch(error){
    console.error("Token verification failed:", error);
    return response.status(401).json({
        success: false,
        message: "Invalid Token",
        error
    });
}
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in token verification",
            error
        })
    }
}



exports.isStudent = async(request,response,next)=>{
    try{
        if(request.user.role !== "Student"){
            return response.status(400).json({
                success:false,
                message:"This is a protected route only for student",
            })
        }
        next();
    }catch(error){
        return response.status(400).json({
            success:false,
            message:"Error in authorization of student",
        })
    }
    }


    exports.isInstructor = async(request,response,next)=>{
        try{
            if(request.user.role !== "Instructor"){
                return response.status(400).json({
                    success:false,
                    message:"This is a protected route only for instructor",
                })
            }
            next();
        }catch(error){
            return response.status(400).json({
                success:false,
                message:"Error in authorization of instructor",
            })
        }
        }



        exports.isAdmin = async(request,response,next)=>{
            try{
                if(request.user.role !== "Admin"){
                    return response.status(400).json({
                        success:false,
                        message:"This is a protected route only for admin",
                    })
                }
                next();
            }catch(error){
                return response.status(400).json({
                    success:false,
                    message:"Error in authorization of admin",
                })
            }
            }