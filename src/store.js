import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  userLoginReducer,
  loadUserReducer,
  getProfileReducer,
  getAllProfilesReducer,
  getOnboardStatusReducer,
  getAdoProjectsReducer,
  getAllWorkItemsIdReducer,
  getAllWorkItemsDetailsReducer,
  getProjectWorkItemsReducer,
  getJiraLabelsReducer,
  getAllIssuesReducer,
  getLabelIssuesReducer,
  setAdoFilterReducer,
  setJiraFilterReducer,
  toggleReducer,
  alertReducer,
} from './reducers/index';

// ROOT REDUCER
const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userInfo: loadUserReducer,
  profile: getProfileReducer,
  allProfiles: getAllProfilesReducer,
  onboardStatus: getOnboardStatusReducer,
  adoProjects: getAdoProjectsReducer,
  allWorkItemsId: getAllWorkItemsIdReducer,
  allWorkItemsDetails: getAllWorkItemsDetailsReducer,
  projectWorkItems: getProjectWorkItemsReducer,
  jiraLabels: getJiraLabelsReducer,
  allIssues: getAllIssuesReducer,
  labelIssues: getLabelIssuesReducer,
  adoFilter: setAdoFilterReducer,
  jiraFilter: setJiraFilterReducer,
  toggle: toggleReducer,
  alert: alertReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
