import { SET_ALERT, REMOVE_ALERT } from '../constants/alertsConstants';

export const setAlert =
  (msg, alertType, timeout = 4000) =>
  (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        alertType,
      },
    });

    window.scrollTo(0, 0);

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
        }),
      timeout
    );
  };
