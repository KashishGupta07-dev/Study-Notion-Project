import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart : localStorage.getItem("cart") ?  JSON.parse(localStorage.getItem("cart")) :  [],
    numberOfItems:localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):0,
}
const CartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setNumberOfItems:(state,actions)=>{
            state.numberOfItems = actions.payload;
        },
        setCart(state,actions){
            state.cart = actions.payload;
        }
    }
})


export const{setNumberOfItems,setCart} = CartSlice.actions;
export default CartSlice.reducer;