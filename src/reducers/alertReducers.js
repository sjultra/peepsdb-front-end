import { SET_ALERT, REMOVE_ALERT } from '../constants/alertsConstants';
import { RESET_STATE } from '../constants/userConstants';

const initialState = null;

export const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return payload;

    case REMOVE_ALERT:
    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
};
