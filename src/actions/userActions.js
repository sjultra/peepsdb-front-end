import axios from 'axios';
import Cookies from 'js-cookie';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  RESET_STATE,
} from '../constants/userConstants';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  dispatch({
    type: LOAD_USER_REQUEST,
  });

  try {
    const res = await axios.get('/auth');

    const { email, name, role } = res.data;

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: {
        email,
        name,
        role,
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
    const cookieJwt = Cookies.get('x-auth-cookie');

    if (cookieJwt) {
      setAuthToken(cookieJwt);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: cookieJwt,
      });
    }

    dispatch(loadUser());
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

  dispatch({
    type: RESET_STATE,
  });
};
