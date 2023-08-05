import axios from 'axios';
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

// Encode personalAccessToken to Base64
const personalAccessToken = process.env.REACT_APP_ADO_PAT;
const patBase64 = window.btoa(':' + personalAccessToken);

// Set Config
const config = {
  headers: {
    Authorization: `Basic ${patBase64}`,
    'Content-Type': 'application/json',
  },
};

// GET ALL ADO PROJECTS
export const getAdoProjects = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ADO_PROJECTS_REQUEST,
    });

    const res = await axios.get(
      'https://dev.azure.com/sjultra/_apis/projects?api-version=6.0',
      config
    );

    dispatch({
      type: GET_ADO_PROJECTS_SUCCESS,
      payload: res.data.value.map((item) => {
        return {
          name: item.name,
        };
      }),
    });
  } catch (err) {
    dispatch({
      type: GET_ADO_PROJECTS_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET ALL ADO WORKITEMS ID
export const getAllWorkItemsId = () => async (dispatch) => {
  try {
    const body = {
      query:
        "Select [System.Id], [System.Title], [System.State], [System.AssignedTo], [System.WorkItemType] From WorkItems Where [State] <> 'Closed' AND [State] <> 'Removed' AND [State] <> 'Done' order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc",
    };

    dispatch({
      type: GET_ALL_WORKITEMS_ID_REQUEST,
    });

    const res = await axios.post(
      `https://dev.azure.com/sjultra/_apis/wit/wiql?api-version=6.0`,
      body,
      config
    );

    dispatch({
      type: GET_ALL_WORKITEMS_ID_SUCCESS,
      payload: res.data.workItems.map((item) => {
        return {
          id: item.id,
        };
      }),
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_WORKITEMS_ID_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET ALL ADO WORKITEMS DETAILS
export const getAllWorkItemsDetails = (ids) => async (dispatch) => {
  try {
    const body = {
      ids: ids,
      fields: [
        'System.Id',
        'System.Title',
        'System.AssignedTo',
        'System.State',
        'System.ChangedDate',
        'System.TeamProject',
        'System.WorkItemType'
      ],
    };

    dispatch({
      type: GET_ALL_WORKITEMS_DETAILS_REQUEST,
    });

    const res = await axios.post(
      'https://dev.azure.com/sjultra/_apis/wit/workitemsbatch?api-version=6.0',
      body,
      config
    );

    dispatch({
      type: GET_ALL_WORKITEMS_DETAILS_SUCCESS,
      // payload: res.data.value,
      payload: res.data.value.map((item,index) => {
        const {fields} = item
        const id = fields['System.Id'];
        const teamProject = fields['System.TeamProject'];
        const changedDate = fields['System.ChangedDate'];
        const title = fields['System.Title'];
        const assignedTo = fields['System.AssignedTo'];
        const state = fields['System.State'];
        const taskType = fields['System.WorkItemType']
        !index && console.log('first item index',item)
        return {
            id,
            teamProject,
            updated:changedDate,
            summary:title,
            status:state,
            assignee: {
              ...assignedTo,
              emailAddress:assignedTo?.uniqueName
            },
            taskType,
        };
      }),
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_WORKITEMS_DETAILS_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// GET PROJECT WORKITEMS
export const getProjectWorkItems = (workItems) => (dispatch) => {
  dispatch({
    type: GET_PROJECT_WORKITEMS,
    payload: workItems,
  });
};

// SET ADO TEXT FILTER
export const setAdoTextFilter = (text) => (dispatch) => {
  dispatch({
    type: SET_ADO_TEXT_FILTER,
    payload: text,
  });
};

// SET ADO ASSIGNED TO FILTER
export const setAdoAssignedToFilter = (assignedTo) => (dispatch) => {
  dispatch({
    type: SET_ADO_ASSIGNEDTO_FILTER,
    payload: assignedTo,
  });
};

// SET ADO STATE FILTER
export const setAdoStateFilter = (state) => (dispatch) => {
  dispatch({
    type: SET_ADO_STATE_FILTER,
    payload: state,
  });
};

// FILTERED WORKITEMS
export const filteredWorkItems = (workItems, { text, assignedTo, state }) =>
  workItems &&
  workItems.filter((item) => {
    const textMatch =
      text.length === 0 ||
      item.fields.title.toLowerCase().includes(text.toLowerCase());

    const unassigned = () => {
      if (assignedTo === 'Unassigned') {
        return !item.fields.assignedTo.displayName;
      }
    };

    const assignedToMatch =
      assignedTo.length === 0 ||
      (item.fields.assignedTo.displayName &&
        item.fields.assignedTo.displayName.includes(assignedTo)) ||
      unassigned();

    const stateMatch = state.length === 0 || item.fields.state.includes(state);

    return textMatch && assignedToMatch && stateMatch;
  });
