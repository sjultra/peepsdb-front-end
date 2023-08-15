import axios from 'axios';
import Cookies from 'js-cookie';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_ONBOARD_STATUS_REQUEST,
  GET_ONBOARD_STATUS_SUCCESS,
  GET_ONBOARD_STATUS_FAILURE,
} from '../constants/onboardConstants';

// 5N763&8r
export const getUserOnboardStatus = (user) => async (dispatch) => {
  try {
    const cookieJwt = Cookies.get('x-auth-cookie');
    setAuthToken(cookieJwt);

    dispatch({
      type: GET_ONBOARD_STATUS_REQUEST,
    });

    const res = await axios.get(`/onboard/${user}`);

    dispatch({
      type: GET_ONBOARD_STATUS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ONBOARD_STATUS_FAILURE,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};

export const updateUserOnboardStatus = (formData) => async (dispatch) => {
  try {
    const cookieJwt = Cookies.get('x-auth-cookie');
    setAuthToken(cookieJwt);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/onboard', formData, config);

    dispatch({
      type: GET_ONBOARD_STATUS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ONBOARD_STATUS_FAILURE,
      payload: {
        msg: err.response.data.msg,
        status: err.response.status,
      },
    });
  }
};
