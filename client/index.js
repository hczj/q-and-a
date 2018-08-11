import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import './socket';
import './sass/index.scss'

import { Navbar } from './components';
import Routes from './routes';

const App = () => (
  <div>
    <Navbar />
    <div className="section">
      <div className="container">
        <Routes />
      </div>
    </div>
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
