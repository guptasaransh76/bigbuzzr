import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {Link, Redirect} from "react-router";
import {Image} from "react-bootstrap";
import $ from "jquery";
import img from "../../img/abc.jpg";
import style from "../../css/home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div className={style.box}>
        <div>

          <center><Image src={img} className={style.img}/></center>
        </div>
        {/*<div className={style.right}>*/}
          {/*<p>text</p>*/}
        {/*</div>*/}
      </div>
    );
  }
}

