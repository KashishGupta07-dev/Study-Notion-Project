import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading:false,
}
const ProfileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser:(state,actions)=>{
            state.user = actions.payload;
        },
        setLoading:(state,actions)=>{
            state.loading = actions.payload;
        },
    }
})

export const {setUser,setLoading} = ProfileSlice.actions;
export default ProfileSlice.reducer;

