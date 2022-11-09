import { createSlice } from "@reduxjs/toolkit";

const initialState={
    // makemode:[],
    // basicfact:[],
    // details:[],
    contactinfo:[]
}

export const submitdetails=createSlice({
    name:"vechilesDetails",
    initialState,
    reducers:{
      makemodesave:(state, action)=>{
        // state.makemode.push(action.payload)
      },
      basicfactsave:(state,action)=>{
        // state.basicfact.push(action.payload)
      },
      detailssave:(state, action)=>{
        // state.details.push(action.payload)
      },
      contactinfosave:(state,action)=>{
        state.contactinfo.push(action.payload)
      }  
    }
})

export const {makemodesave, basicfactsave, detailssave, contactinfosave} = submitdetails.actions

export default submitdetails.reducer