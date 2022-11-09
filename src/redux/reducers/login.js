import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{},
}

export const login=createSlice({
    name:"auth",
    initialState,
    reducers:{
      auth:(state, action)=>{
        state.user=action.payload
      },
      
    }
})

export const {auth } = login.actions

export default login.reducer