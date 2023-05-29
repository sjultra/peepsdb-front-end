import Cookies from 'js-cookie';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  RESET_STATE,
} from '../constants/userConstants';
import Axios from '../utils/axios';

// Load User
export const loadUser = (cookie) => async (dispatch) => {
  dispatch({
    type: LOAD_USER_REQUEST,
  });
  const token = localStorage.getItem('peepsdb-auth-token') || cookie;

  try {
    console.log('axios instance', token);
    const res = await Axios.get('/auth', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });

    const { email, name, role, username } = res.data;

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: {
        email,
        name,
        role,
        username,
      },
    });
  } catch (err) {
    Cookies.remove('x-auth-cookie', {
      domain: 'sjultra.com',
      sameSite: 'none',
      secure: true,
    });

    dispatch({
      type: RESET_STATE,
    });
  }
};

// Login User
export const loginUser = () => (dispatch) => {
  try {
    const jwt = localStorage.getItem('peepsdb-auth-token');
    console.log('jwt token', jwt);

    if (jwt) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: jwt,
      });

      dispatch(loadUser());
    }
  } catch (err) {
    Cookies.remove('x-auth-cookie');
    dispatch({
      type: USER_LOGIN_FAILURE,
    });
  }
};

// Logout User
export const logoutUser = () => (dispatch) => {
  Cookies.remove('x-auth-cookie');
  localStorage.removeItem('peepsdb-auth-token');
  dispatch({
    type: RESET_STATE,
  });
};
