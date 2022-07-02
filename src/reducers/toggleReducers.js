import { TOGGLE_ADO, TOGGLE_JIRA } from '../constants/toggleConstants';
import { RESET_STATE } from '../constants/userConstants';

const initialState = {
  ado: true,
  jira: false,
};

export const toggleReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_ADO:
      return {
        ado: true,
        jira: false,
      };

    case TOGGLE_JIRA:
      return {
        ado: false,
        jira: true,
      };

    case RESET_STATE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
