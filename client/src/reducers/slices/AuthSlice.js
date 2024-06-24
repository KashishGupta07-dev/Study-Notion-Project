import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  isResetTokenGenerated : false,
}
const AuthSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers: {
        setSignupData(state, value) {
          state.signupData = value.payload;
        },
        setLoading(state, value) {
          state.loading = value.payload;
        },
        setToken(state, value) {
          state.token = value.payload;
        },
        setResetToken(state,value){
          state.isResetTokenGenerated = value.payload;
        }
      },
})

export const { setSignupData, setLoading, setToken,setResetToken } = AuthSlice.actions;

export default AuthSlice.reducer;