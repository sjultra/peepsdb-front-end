import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { isRejectedWithValue } from "@reduxjs/toolkit";
import auth from './reducers/auth';
import widget from './reducers/widget';
const rootReducer = combineReducers({
    auth:auth,
    onboarding:auth,
    widget
    
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
  