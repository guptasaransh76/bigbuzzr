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

        <div className={style.modal}>
          {/*<center><Image src={img} className={style.img}/></center>*/}

          <div>
            <h2 class="card-title" style={{fontWeight: "bold", letterSpacing: "3px"}}> Welcome to BigBuzzr.</h2>
            <p class="card-text">Best Quiz Platform for school / University competitions.</p>
            <p class="card-text">No more hassles in adding Quiz banks and playing quizes.</p>
            <p class="card-text">To participate kindly switch your url to <strong>bigbuzzr.game/participant</strong>.</p>
          </div>
        </div>

        <div class="footer">
          <p class="footer-links" className={style.flink}>About Help Blog Privacy Policy Info Settings © 2018 BigBuzzr</p>
        </div>


      </div>
    );
  }
}

