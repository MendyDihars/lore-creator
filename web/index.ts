// Style
import './styles/index.scss';

// JS
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from './store';

import App from './src/App';

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