import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';
import {Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <Routes/>
  </Router>, document.getElementById('root'));
serviceWorker.unregister();
