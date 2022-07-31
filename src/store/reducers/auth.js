import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    auth: {
        isAuthenticated:false

    },
    profile:{

    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth :(state,action)=>{
            state['auth']={...action.payload}
        },
        setProfile:(state,action)=>{
            state['profile']={...action.payload}

        }

        

    },
    
});

export const selectAuth = (state) => state.auth;


export const {actions:authActions,reducer:authReducer} = authSlice;


export default authSlice.reducer;

