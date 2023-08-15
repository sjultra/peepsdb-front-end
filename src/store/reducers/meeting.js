import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profiles: undefined,
  name: [],
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
});

export const selectMeeting = (state) => state.meeting;

export const { actions: meetingActions, reducer: meetingReducer } =
  meetingSlice;

export default meetingSlice.reducer;
