import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    profiles:[],
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

        }

        
        

    },
    
});

export const selectTeam = (state) => state.team;


export const {actions:teamActions,reducer:teamReducer} = teamSlice;


export default teamSlice.reducer;

