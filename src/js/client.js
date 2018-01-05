import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import { isAuthenticated } from "./api/axios";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Master from "./pages/Master";
import Banks from "./pages/Banks";
import Quiz from "./pages/Quiz";

const app = document.getElementById('app');

const requireAuth = (nextState, replace) => {
  console.log("Router - Login");
  return isAuthenticated().then(
    (response) => {
    if (response.data.status === 'success') {
      return true;
    } else {
      return browserHistory.push({
        pathname: '/login',
        state: { nextState: nextState.location.pathname }
      });
    }
  }).catch(
    (err) => {
      return browserHistory.push({
        pathname: '/login',
        state: { nextState: nextState.location.pathname }
      });
  });
};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="login" name="login" component={Login}></Route>
      <Route path="master" name="master" component={Master} onEnter={requireAuth}></Route>
      <Route path="bank" name="bank" component={Banks} onEnter={requireAuth}></Route>
      <Route path="quiz" name="quiz" component={Quiz} onEnter={requireAuth}></Route>
    </Route>
  </Router>,
  app);
