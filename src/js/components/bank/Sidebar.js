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

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(nextProps) {
    // console.log("Sidebar ComponentWillReceiveProps ", nextProps);
  }

  render() {
    return (
      <div>

          <div>
            <button className={style.addbutton} onClick={this.props.onAddNewButtonClick}>Add</button>
          </div>
        {
          this.props.quesarr.map((row, idx) => (
            <div className={style.leftbox} key={"bank_ques_" + idx}
                 onClick={() => this.props.loadQuestion(idx)}>
              {(idx + 1) + ". " + row.ques}
            </div>
          ))
        }
      </div>
    );

  }
}