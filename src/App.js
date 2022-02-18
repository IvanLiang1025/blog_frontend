import React from 'react';

import "antd/dist/antd.css"

import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './rootStore/store';

import RouteView from './router/index.js';
import routerData from './config/routerConfig';
import history from './utils/history';
import {ConnectedRouter} from "connected-react-router";
import NavBar from './Components/NavBar';
import {Spin} from "antd";
import AnimationLoader from './Components/AnimationLoader';

function App() {


  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
          <RouteView routes={routerData}></RouteView>
      </ConnectedRouter>
    </Provider>

  );
}

export default App;
