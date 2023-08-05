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
import Axios from '../utils/axios.js';

// Encode personalAccessToken to Base64
// const personalAccessToken = process.env.REACT_APP_JIRA_PAT;
// const patBase64 = window.btoa(personalAccessToken);

// Set API calls config
// const config = {
//   headers: {
//     Authorization: `Basic ${patBase64}`,
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// };

// GET ALL JIRA LABELS
export const getJiraLabels =
  (AxiosInstance = Axios) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_JIRA_LABELS_REQUEST,
      });

      // const res = await axios.get(
      //   `https://api.atlassian.com/ex/jira/${process.env.REACT_APP_CLOUD_ID}/rest/api/3/label`,
      //   config
      // );

      const res = await AxiosInstance.get('/jira/labels');

      console.log('jira labels at frontend', res.data);

      dispatch({
        type: GET_JIRA_LABELS_SUCCESS,
        payload: res.data.values,
      });
    } catch (err) {
      dispatch({
        type: GET_JIRA_LABELS_FAILURE,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// GET ALL JIRA ISSUES
export const getAllIssues =
  (startAt = 0, AxiosInstance = Axios) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_ISSUES_REQUEST,
      });

      const res = await AxiosInstance.get(`/jira/issues?start=${startAt}`);

      const { data } = res;

      console.log('request data', data);

      // const res = await axios.get(
      //   `https://api.atlassian.com/ex/jira/${process.env.REACT_APP_CLOUD_ID}/rest/api/3/search?startAt=${startAt}&maxResults=100`,
      //   config
      // );

      dispatch({
        type: GET_ALL_ISSUES_SUCCESS,
        payload: {
          issues: res.data.issues.map((issue) => {
            const {fields,key,id} = issue;
            const updated = fields?.updated;
            const summary = fields?.summary;
            const assignee = fields?.assignee;
            const status = fields?.status?.statusCategory?.name;
            const taskType = fields?.issuetype
            const labels = fields?.labels;
            const total = fields?.total;

            return { 
              id, 
              labels, 
              total,
              summary,
              assignee:{
                ...assignee,
                uniqueId:assignee?.accountId
              },
              status,
              updated,
              key,
              taskType,
            };
          }),
          total: res.data.total,
        },
      });
    } catch (err) {
      dispatch({
        type: GET_ALL_ISSUES_FAILURE,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// GET LABEL ISSUES
export const getLabelIssues =
  (label, startAt = 0, AxiosInstance = Axios) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_LABEL_ISSUES_REQUEST,
      });

      // const res = await axios.get(
      //   `https://api.atlassian.com/ex/jira/${process.env.REACT_APP_CLOUD_ID}/rest/api/3/search?jql=labels%20IN%20(%22${label}%22)&startAt=${startAt}&maxResults=100`,
      //   config
      // );
      const res = await AxiosInstance.get(
        `/jira/label/issues?start=${startAt}&label=${label} `
      );

      dispatch({
        type: GET_LABEL_ISSUES_SUCCESS,
        payload: {
          label,
          issues: res.data.issues.map((issue) => {
            const key = issue.key;
            const {updated,summary,assignee,status:statusCategory} = issue?.fields
            const status = statusCategory.name;
            
            return {
              key,
              updated,
              summary,
              assignee:assignee? {
                  ...assignee,
                  avatarUrl: assignee.avatarUrls['16x16'],
              }:{},
              status,
            };
          }),
          total: res.data.total,
        },
      });
    } catch (err) {
      dispatch({
        type: GET_LABEL_ISSUES_FAILURE,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// CLEAR LABEL ISSUES
export const clearLabelIssues = () => (dispatch) => {
  dispatch({
    type: CLEAR_LABEL_ISSUES,
  });
};

// SET JIRA TEXT FILTER
export const setJiraTextFilter = (text) => (dispatch) => {
  dispatch({
    type: SET_JIRA_TEXT_FILTER,
    payload: text,
  });
};

// SET JIRA ASSIGNED TO FILTER
export const setJiraAssignedToFilter = (assignedTo) => (dispatch) => {
  dispatch({
    type: SET_JIRA_ASSIGNEDTO_FILTER,
    payload: assignedTo,
  });
};

// SET JIRA STATUS FILTER
export const setJiraStatusFilter = (status) => (dispatch) => {
  dispatch({
    type: SET_JIRA_STATUS_FILTER,
    payload: status,
  });
};

// FILTERED LABEL ISSUES
export const filteredLabelIssues = (
  labelIssues,
  { text, assignedTo, status }
) =>
  labelIssues &&
  labelIssues.filter((item) => {
    const textMatch =
      text.length === 0 ||
      item?.summary.toLowerCase().includes(text.toLowerCase());

    const unassigned = () => {
      if (assignedTo === 'Unassigned') {
        return !item?.assignee.displayName;
      }
    };

    const assignedToMatch =
      assignedTo.length === 0 ||
      (item?.assignee.displayName &&
        item?.assignee.displayName.includes(assignedTo)) ||
      unassigned();

    const statusMatch =
      status.length === 0 || item?.status.includes(status);

    return textMatch && assignedToMatch && statusMatch;
  });



