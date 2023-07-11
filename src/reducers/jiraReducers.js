import {
  GET_JIRA_LABELS_REQUEST,
  GET_JIRA_LABELS_SUCCESS,
  GET_JIRA_LABELS_FAILURE,
  GET_ALL_ISSUES_REQUEST,
  GET_ALL_ISSUES_SUCCESS,
  GET_ALL_ISSUES_FAILURE,
  GET_LABEL_ISSUES_REQUEST,
  GET_LABEL_ISSUES_SUCCESS,
  GET_LABEL_ISSUES_FAILURE,
  CLEAR_LABEL_ISSUES,
  SET_JIRA_TEXT_FILTER,
  SET_JIRA_ASSIGNEDTO_FILTER,
  SET_JIRA_STATUS_FILTER,
} from '../constants/jiraConstants.js';
import { RESET_STATE } from '../constants/userConstants.js';

// GET JIRA LABELS
const getJiraLabelsInitialState = {
  loading: false,
};

export const getJiraLabelsReducer = (
  state = getJiraLabelsInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_JIRA_LABELS_REQUEST:
      return {
        loading: true,
      };

    case GET_JIRA_LABELS_SUCCESS:
      return {
        loading: false,
        labels: payload,
      };

    case GET_JIRA_LABELS_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case RESET_STATE:
      return {
        ...getJiraLabelsInitialState,
      };

    default:
      return state;
  }
};

// GET ALL ISSUES
const getAllIssuesInitialState = {
  loading: false,
  issues: [],
  total: null,
};

export const getAllIssuesReducer = (
  state = getAllIssuesInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_ISSUES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_ISSUES_SUCCESS:
      return {
        loading: false,
        issues: [...state.issues, ...payload.issues],
        total: payload.total,
      };

    case GET_ALL_ISSUES_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case RESET_STATE:
      return {
        ...getAllIssuesInitialState,
      };

    default:
      return state;
  }
};

// GET LABEL ISSUES
const getLabelIssuesInitialState = {
  loading: false,
  issues: [],
  total: null,
};

export const getLabelIssuesReducer = (
  state = getLabelIssuesInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LABEL_ISSUES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_LABEL_ISSUES_SUCCESS:
      return {
        loading: false,
        issues: [...state.issues, ...payload.issues],
        total: payload.total,
      };

    case GET_LABEL_ISSUES_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case CLEAR_LABEL_ISSUES:
    case RESET_STATE:
      return {
        ...getLabelIssuesInitialState,
      };

    default:
      return state;
  }
};

// SET JIRA FILTER
const setJiraFilterInitialState = {
  text: '',
  assignedTo: '',
  status: '',
};

export const setJiraFilterReducer = (
  state = setJiraFilterInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_JIRA_TEXT_FILTER:
      return {
        ...state,
        text: payload,
      };

    case SET_JIRA_ASSIGNEDTO_FILTER:
      return {
        ...state,
        assignedTo: payload,
      };

    case SET_JIRA_STATUS_FILTER:
      return {
        ...state,
        status: payload,
      };

    case RESET_STATE:
      return {
        ...setJiraFilterInitialState,
      };

    default:
      return state;
  }
};
