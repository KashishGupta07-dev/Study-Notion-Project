import { combineReducers } from "@reduxjs/toolkit"
import profileReducer from "./slices/ProfileSlice";
import cartReducer from "./slices/CartSlice";
import authReducer from "./slices/AuthSlice";
import courseReducer from "./slices/CourseSlice";
import viewCourseReducer from "./slices/ViewCourseSlice";
const combinedReducers = combineReducers(
   {
    profile:profileReducer,
    cart:cartReducer,
    auth:authReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer
   }
)

export default combinedReducers;