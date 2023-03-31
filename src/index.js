//follow come

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// self imported
import { Provider } from 'react-redux';
import store from './store/index';


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById("root")
);
