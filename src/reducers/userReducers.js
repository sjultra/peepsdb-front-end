import {
  USER_LOGIN_SUCCESS,
  // USER_LOGIN_FAILURE,
  RESET_STATE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
} from '../constants/userConstants';

// USER LOGIN & LOGOUT
const userLoginInitialState = {
  loading: true,
  token: localStorage.getItem('peepsdb-auth-token'),
  isAuthenticated: false,
};

export const userLoginReducer = (state = userLoginInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_SUCCESS:
      localStorage.setItem('peepsdb-auth-token', payload);
      return {
        loading: false,
        token: payload,
        isAuthenticated: true,
      };

    case RESET_STATE:
      localStorage.removeItem('peepdb-auth-token');
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

// LOAD LOGGED IN USER
const loadUserInitialState = {
  loading: false,
};

export const loadUserReducer = (state = loadUserInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_REQUEST:
      return {
        loading: true,
      };

    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        user: payload,
      };

    case RESET_STATE:
      return {
        ...loadUserInitialState,
      };

    default:
      return state;
  }
};
