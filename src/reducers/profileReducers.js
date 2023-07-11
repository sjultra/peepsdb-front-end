import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_ALL_PROFILES_REQUEST,
  GET_ALL_PROFILES_SUCCESS,
  GET_ALL_PROFILES_FAILURE,
} from '../constants/profileConstants';
import { RESET_STATE } from '../constants/userConstants';

// GET PROFILE
const getProfileInitialState = {
  loading: false,
};

export const getProfileReducer = (state = getProfileInitialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_REQUEST:
      return {
        loading: true,
      };

    case GET_PROFILE_SUCCESS:
      return {
        loading: false,
        profile: payload,
      };

    case GET_PROFILE_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case RESET_STATE:
      return {
        ...getProfileInitialState,
      };

    default:
      return state;
  }
};

// GET ALL PROFILE
const getAllProfilesInitialState = {
  loading: false,
};

export const getAllProfilesReducer = (
  state = getAllProfilesInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PROFILES_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_PROFILES_SUCCESS:
      return {
        loading: false,
        profiles: payload,
      };

    case GET_ALL_PROFILES_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case RESET_STATE:
      return {
        ...getAllProfilesInitialState,
      };

    default:
      return state;
  }
};
