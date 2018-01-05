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
  render() {
    return (
      <div className={style.left}>
        {
          this.props.quesarr.map((row, idx) => (
            <Button>
              <div className={style.leftbox} key={"bank_ques_" + idx}
                   onClick={() => this.props.loadQuestion(idx)}>
                {(idx + 1) + ". " + row.ques}
              </div>
            </Button>
          ))
        }
      </div>
    );

  }
}