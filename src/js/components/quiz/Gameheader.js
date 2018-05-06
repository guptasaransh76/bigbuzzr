import React from "react";
import {Link} from "react-router";
import {
  Button,
  ButtonGroup
} from "react-bootstrap";
import style from "../../../css/bank.css";

export default class Gameheader extends React.Component {
  render() {
    return (
      <div className={style.head}>

        <div style={{marginLeft: "2vh", width: "20vw", fontWeight: "bold"}}>
          <h2 class="card-title"> Let's Start </h2>
        </div>

        <div style={{marginLeft: "-40vw"}}>
          <p class="card-text">Game Tag: {this.props.gameTag}</p>
        </div>


        <div className={style.bankTitle}>
          <Button class="btn btn-danger" onClick={this.props.handleQuit} style={{marginRight: "0.5vw"}}>Quit
            Quiz</Button>
        </div>

      </div>
    );

  }
}
