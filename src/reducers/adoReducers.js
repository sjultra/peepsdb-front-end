import {
  GET_ADO_PROJECTS_REQUEST,
  GET_ADO_PROJECTS_SUCCESS,
  GET_ADO_PROJECTS_FAILURE,
  GET_ALL_WORKITEMS_ID_REQUEST,
  GET_ALL_WORKITEMS_ID_SUCCESS,
  GET_ALL_WORKITEMS_ID_FAILURE,
  GET_ALL_WORKITEMS_DETAILS_REQUEST,
  GET_ALL_WORKITEMS_DETAILS_SUCCESS,
  GET_ALL_WORKITEMS_DETAILS_FAILURE,
  GET_PROJECT_WORKITEMS,
  SET_ADO_TEXT_FILTER,
  SET_ADO_ASSIGNEDTO_FILTER,
  SET_ADO_STATE_FILTER,
} from '../constants/adoConstants';
import { RESET_STATE } from '../constants/userConstants';

// GET ADO PROJECTS
const getAdoProjectsInitialState = {
  loading: false,
};

export const getAdoProjectsReducer = (
  state = getAdoProjectsInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ADO_PROJECTS_REQUEST:
      return {
        loading: true,
      };

    case GET_ADO_PROJECTS_SUCCESS:
      return {
        loading: false,
        projects: payload,
      };

    case GET_ADO_PROJECTS_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case RESET_STATE:
      return {
        ...getAdoProjectsInitialState,
      };

    default:
      return state;
  }
};

// GET ALL WORKITEMS ID
const getAllWorkItemsIdInitialState = {
  loading: false,
};

export const getAllWorkItemsIdReducer = (
  state = getAllWorkItemsIdInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_WORKITEMS_ID_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_WORKITEMS_ID_SUCCESS:
      return {
        loading: false,
        workItemsId: payload,
      };

    case GET_ALL_WORKITEMS_ID_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case RESET_STATE:
      return {
        ...getAllWorkItemsIdInitialState,
      };

    default:
      return state;
  }
};

// GET ALL WORKITEMS DETAILS
const getAllWorkItemsDetailsInitialState = {
  loading: false,
};

export const getAllWorkItemsDetailsReducer = (
  state = getAllWorkItemsDetailsInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_WORKITEMS_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case GET_ALL_WORKITEMS_DETAILS_SUCCESS:
      return {
        loading: false,
        workItemsDetails: payload,
      };

    case GET_ALL_WORKITEMS_DETAILS_FAILURE:
      return {
        loading: false,
        error: payload,
      };

    case RESET_STATE:
      return {
        ...getAllWorkItemsDetailsInitialState,
      };

    default:
      return state;
  }
};

// GET PROJECT WORKITEMS
const getProjectWorkItemsInitialState = {
  loading: true,
};

export const getProjectWorkItemsReducer = (
  state = getProjectWorkItemsInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT_WORKITEMS:
      return {
        loading: false,
        projectWorkItems: payload,
      };

    case RESET_STATE:
      return {
        ...getProjectWorkItemsInitialState,
      };

    default:
      return state;
  }
};

// SET ADO FILTER
const setAdoFilterInitialState = {
  text: '',
  assignedTo: '',
  state: '',
};

export const setAdoFilterReducer = (
  state = setAdoFilterInitialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ADO_TEXT_FILTER:
      return {
        ...state,
        text: payload,
      };

    case SET_ADO_ASSIGNEDTO_FILTER:
      return {
        ...state,
        assignedTo: payload,
      };

    case SET_ADO_STATE_FILTER:
      return {
        ...state,
        state: payload,
      };

    case RESET_STATE:
      return {
        ...setAdoFilterInitialState,
      };

    default:
      return state;
  }
};
