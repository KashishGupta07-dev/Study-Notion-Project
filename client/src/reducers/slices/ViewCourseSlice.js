import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    courseDetails : null,
    subSectionDetails:null,
    sectionDetails:null,
    totalLectures:0,
    completedLectures:0,
}
const ViewCourseSlice = createSlice({
    name:"viewCourse",
    initialState:initialState,
    reducers:{
        setCourseDetails(state,actions){
            state.courseDetails = actions.payload;
        },
        setSubSectionDetails(state,actions){
            state.subSectionDetails = actions.payload;
        },
        setSectionDetails(state,actions){
            state.sectionDetails = actions.payload;
        },
        setTotalLectures(state,actions){
            state.totalLectures = actions.payload;
        },
        setCompletedLectures(state,actions){
            state.completedLectures = actions.payload;
        },
    }
})

export const {setCompletedLectures,setCourseDetails,setSectionDetails,setSubSectionDetails,setTotalLectures} = ViewCourseSlice.actions; 
export default ViewCourseSlice.reducer;