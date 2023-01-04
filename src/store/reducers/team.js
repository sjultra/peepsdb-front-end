import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    profiles:[],
    logs:[]
}

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        setProfiles :(state,action)=>{
            state.profiles=action.payload
        },
        dumpToProfiles:(state,action)=>{

        },
        replaceProfile:(state,action)=>{
            let profileHolder = state.profiles;
            let profileIndex = state.profiles.findIndex(profile=>profile?._id===action.payload._id);
            profileHolder[profileIndex] = action.payload;

            state.profiles = [profileIndex]
        },
        setLogs:(state,action)=>{
          state.logs = action.payload  
        },

        updateProfile:(state,action)=>{


            let profileHolder = state.profiles;
            let profileIndex = state.profiles.findIndex(profile=>profile?._id===action.payload._id);
            console.log('profileIndex',state.profiles);
            profileHolder[profileIndex] = {
                ...profileHolder[profileIndex],
                ...action.payload
            };
            state.profiles = [...profileHolder]
            console.log('updating profile',action.payload)
        },



        
        

    },
    
});

export const selectTeam = (state) => state.team;


export const {actions:teamActions,reducer:teamReducer} = teamSlice;


export default teamSlice.reducer;

