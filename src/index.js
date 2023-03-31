//follow come

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// self imported
import { Provider } from 'react-redux';
import store from './store/index';


ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
  ,
  document.getElementById("root")
);
