import React from 'react';

import "antd/dist/antd.css"
// import Home from "./pages/home";
import Admin from "./pages/admin/admin.js";
import Login from "./pages/login/login.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
