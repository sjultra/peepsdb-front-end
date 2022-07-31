import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading:false,
    modal:{
        closeOnEsc:true,
        open:false,
        size:'md',
        title:'',
        children:null,
    }
}

const widgetSlice = createSlice({
    name: "widget",
    initialState,
    reducers: {
        setLoading :(state,action)=>{
            state.loading=action.payload
        },

        setModal :(state,action)=>{
            state.modal=action.payload
        },

        
        

    },
    
});

export const selectWidget = (state) => state.widget;


export const {actions:widgetActions,reducer:widgetReducer} = widgetSlice;


export default widgetSlice.reducer;

