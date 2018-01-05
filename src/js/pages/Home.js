import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {Link, Redirect} from "react-router";
import {Image} from "react-bootstrap";
import $ from "jquery";
import img from "../../img/Poster.png";
import style from "../../css/home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Image src={img} className={style.img}/>
      </div>
    );
  }
}

