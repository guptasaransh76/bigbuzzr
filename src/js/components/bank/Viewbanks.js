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

export default class Viewbanks extends React.Component {

  renderTableBody(rows) {
    return rows.map(
      (row, i) => {
        return (
          <tr>
            <th scope="row">{i + 1}</th>
            <td>{row.bank_id}</td>
            <td>{row.bank_name}</td>
            <td>{row.count}</td>
            <td>View</td>
          </tr>
        );
      });
  }

  render() {
    return (
      <div className={style.jumbo}>
        <table class="table">
          <thead class="thead-inverse">
          <tr>
            <th>#</th>
            <th>Bank Id</th>
            <th>Bank Name</th>
            <th>No. of Questions</th>
            <th>Options</th>
          </tr>
          </thead>
          <tbody>
          {this.renderTableBody(this.props.results)}
          </tbody>
        </table>
      </div>
    );

  }
}