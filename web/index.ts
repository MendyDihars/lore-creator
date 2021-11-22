// Style
import './styles/index.scss';

// JS
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import LoreReducer from './src/reducers/lore-reducer';
import EventReducer from './src/reducers/event-reducer';

import App from './src/App';

const middleware = defaultMiddleware => defaultMiddleware().concat(logger);

const store = configureStore({
  reducer : {
    lores: LoreReducer,
    events: EventReducer
  },
  middleware
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="screen">
        <div className="app">
          <App />
        </div>
        <Link to="/" className="footer flexcenter">
          <div>
            Retour à l'accueil
          </div>
        </Link>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);