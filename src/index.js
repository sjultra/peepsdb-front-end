import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import StateProvider from './contextStore'

ReactDOM.render(
  <StateProvider>
      <Provider store={store}>
        <App />
      </Provider>
  </StateProvider>,
  document.getElementById('root')
);
