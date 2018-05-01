import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {Link, Redirect} from "react-router";
import $ from "jquery";
import Question from "../components/quiz/Question";


export default class Master extends React.Component {
  render() {
    return (
      <div>
        <h1>on Master Page.</h1>
        <Question />
      </div>
    );
  }
}

