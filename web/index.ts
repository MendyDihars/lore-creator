// Style
import './styles/index.scss';

// JS
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import LoreReducer from './src/reducers/lore-reducers';

import App from './src/App';

const middleware = defaultMiddleware => defaultMiddleware().concat(logger);

const store = configureStore({
  reducer : {
    lores: new LoreReducer().reducer()
  },
  middleware
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);