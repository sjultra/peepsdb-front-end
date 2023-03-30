import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { isRejectedWithValue } from "@reduxjs/toolkit";
import auth from './reducers/auth';
import widget from './reducers/widget';
import meeting from './reducers/meeting';
import team from './reducers/team';

import { getAdoProjectsReducer, getAllIssuesReducer, getAllWorkItemsDetailsReducer, getAllWorkItemsIdReducer, getJiraLabelsReducer, getLabelIssuesReducer, getProjectWorkItemsReducer, setAdoFilterReducer, setJiraFilterReducer, toggleReducer } from '../reducers';


const rootReducer = combineReducers({
    auth:auth,
    onboarding:auth,
    widget,
    meeting,
    allWorkItemsId: getAllWorkItemsIdReducer,
    allWorkItemsDetails: getAllWorkItemsDetailsReducer,
    projectWorkItems: getProjectWorkItemsReducer,
    jiraLabels: getJiraLabelsReducer,
    allIssues: getAllIssuesReducer,
    labelIssues: getLabelIssuesReducer,
    adoFilter: setAdoFilterReducer,
    jiraFilter: setJiraFilterReducer,
    adoProjects: getAdoProjectsReducer,
    toggle: toggleReducer,
    team
    
});
  

const queryErrorHandler = (_api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { status, } = action.payload;
    console.warn("We got a rejected action!", action, status, action);
  }

  return next(action);
};


  
const store = configureStore({
reducer: rootReducer,
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
    // logger,
    queryErrorHandler,
  ]),
});
  
export default store;
  