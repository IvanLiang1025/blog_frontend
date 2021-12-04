import React from 'react';

import "antd/dist/antd.css"

import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './rootStore/store';

import RouteView from './router/index.js';
import routerData from './config/routerConfig';
import history from './utils/history';
import {ConnectedRouter} from "connected-react-router";
// import NavBar from './Components/NavBar';
import {Spin} from "antd";
import AnimationLoader from './Components/AnimationLoader';

function App() {

  // console.log(window.location);
  // console.log("==========******")
  // const {pathname} = window.location;
  // console.log(pathname)

  return (
    <Provider store={store}>
      {/* <NavBar></NavBar> */}
      <ConnectedRouter history={history}>
        {/* {
          pathname && !pathname.startsWith("/admin/") && <NavBar></NavBar>
        } */}
        {/* <React.Suspense fallback={<AnimationLoader message loading page"></AnimationLoader>}> */}
          {/* <NavBar></NavBar> */}
          <RouteView routes={routerData}></RouteView>
        {/* </React.Suspense> */}
      </ConnectedRouter>
      {/* </BrowserRouter> */}
    </Provider>

  );
}

export default App;
