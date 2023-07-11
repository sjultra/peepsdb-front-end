import {
  GET_ONBOARD_STATUS_REQUEST,
  GET_ONBOARD_STATUS_SUCCESS,
  GET_ONBOARD_STATUS_FAILURE,
} from '../constants/onboardConstants';
import { RESET_STATE } from '../constants/userConstants';

// GET ONBOARD STATUS
const getOnboardStatusInitialState = {
  loading: false,
};

export const getOnboardStatusReducer = (
  state = getOnboardStatusInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ONBOARD_STATUS_REQUEST:
      return {
        loading: true,
      };

    case GET_ONBOARD_STATUS_SUCCESS:
      return {
        loading: false,
        userStatus: payload,
      };

    case GET_ONBOARD_STATUS_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case RESET_STATE:
      return {
        ...getOnboardStatusInitialState,
      };

    default:
      return state;
  }
};
