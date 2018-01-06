import React from "react";
import {Link, Redirect} from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Body from "./Body";
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
  constructor(props) {
    super(props);

    this.state = {
      table: props.results
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("Viewbanks ComponentWillReceiveProps", nextProps);

    this.setState({
      ...this.state,
      table: nextProps.results
    });
  }

  renderTableBody(rows) {
    return rows.map(
      (row, i) => {
        return (
          <tr key={"viewbank" + i} onClick={(evt) => this.props.handleViewClick(evt, row.bank_id)}>
            <th scope="row">{i + 1}</th>
            <td>{row.bank_id}</td>
            <td>{row.bank_name}</td>
            <td>{row.count}</td>
          </tr>
        );
      });
  }

  render() {
    return (
      <div className={style.jumbo}>
        {
          !this.props.inView &&
          this.state.table &&
          <table class="table">
            <thead class="thead-inverse">
              <tr>
                <th>#</th>
                <th>Bank Id</th>
                <th>Bank Name</th>
                <th>No. of Questions</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableBody(this.state.table)}
            </tbody>
          </table>
        }
        {
          !this.props.inView &&
          !this.state.table &&
          "No question banks founds."
        }
      </div>
    );

  }
}