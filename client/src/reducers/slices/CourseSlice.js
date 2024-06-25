import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step:1,
    course:localStorage.getItem("courseDetail") ? JSON.parse(localStorage.getItem("courseDetail")) : null,
    editCourse:localStorage.getItem("editCourse")?JSON.parse(localStorage.getItem("editCourse")) : false,
}


const CourseSlice = createSlice({
    name:"course",
    initialState:initialState,
    reducers:{
        setStep(state,actions){
            state.step = actions.payload;
        },
        setCourse(state,actions){
            state.course = actions.payload;
        },
        setEditCourse(state,actions){
            state.editCourse = actions.payload;
        }
    }
});


export const {setCourse,setEditCourse,setStep} = CourseSlice.actions;

export default CourseSlice.reducer;
