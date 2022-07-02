import { TOGGLE_ADO, TOGGLE_JIRA } from '../constants/toggleConstants';

export const toggleAdo = () => (dispatch) => {
  dispatch({
    type: TOGGLE_ADO,
  });
};

export const toggleJira = () => (dispatch) => {
  dispatch({
    type: TOGGLE_JIRA,
  });
};
