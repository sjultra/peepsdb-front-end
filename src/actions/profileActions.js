import axios from 'axios';
import Cookies from 'js-cookie';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_ALL_PROFILES_REQUEST,
  GET_ALL_PROFILES_SUCCESS,
  GET_ALL_PROFILES_FAILURE,
} from '../constants/profileConstants';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const cookieJwt = Cookies.get('x-auth-cookie');
    setAuthToken(cookieJwt);

    dispatch({
      type: GET_PROFILE_REQUEST,
    });

    const res = await axios.get('/profiles/me');

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Create profile
export const createProfile = (formData) => async (dispatch) => {
  try {
    const cookieJwt = Cookies.get('x-auth-cookie');

    setAuthToken(cookieJwt);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/profiles', formData, config);

    // Get profile
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Update a profile
export const updateProfile = (formData) => async (dispatch) => {
  try {
    const cookieJwt = Cookies.get('x-auth-cookie');

    setAuthToken(cookieJwt);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/profiles', formData, config);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  try {
    const cookieJwt = Cookies.get('x-auth-cookie');

    setAuthToken(cookieJwt);

    dispatch({
      type: GET_ALL_PROFILES_REQUEST,
    });

    const res = await axios.get('/profiles');

    dispatch({
      type: GET_ALL_PROFILES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_PROFILES_FAILURE,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
