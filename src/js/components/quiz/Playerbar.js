import React from "react";
import {Link, Redirect} from "react-router";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Form,
  Col,
  InputGroup
} from "react-bootstrap";
import style from "../../../css/bank.css";

export default class Playerbar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h2>yo</h2>
        {/*<div>*/}
          {/*<button className={style.addbutton} onClick={this.props.onAddNewButtonClick}>Add</button>*/}
        {/*</div>*/}
        {/*{*/}
          {/*this.props.quesarr.map((row, idx) => (*/}
            {/*<div className={style.leftbox} key={"bank_ques_" + idx}*/}
                 {/*onClick={() => this.props.loadQuestion(idx)}>*/}
              {/*{(idx + 1) + ". " + row.ques}*/}
            {/*</div>*/}
          {/*))*/}
        {/*}*/}
      </div>
    );

  }
}