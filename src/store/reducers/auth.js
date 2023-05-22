import { createSlice } from '@reduxjs/toolkit';

let auth = localStorage.getItem('peepsdb-auth');

const initialState = {
  auth: {
    isAuthenticated: auth ? true : false,
  },
  profile: undefined,
  welcome: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state['auth'] = { ...action.payload };
    },
    setProfile: (state, action) => {
      state['profile'] = { ...action.payload };
    },
    closeWelcome: (state) => {
      state['welcome'] = false;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const { actions: authActions, reducer: authReducer } = authSlice;

export default authSlice.reducer;
