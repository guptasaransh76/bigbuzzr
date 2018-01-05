import React from "react";
import {Link} from "react-router";
import {
  Button,
  ButtonGroup
} from "react-bootstrap";
import style from "../../../css/bank.css";

export default class Header extends React.Component {
  render() {

    if (this.props.onCreate) {
      return (
        <div className={style.head}>

          <div className={style.bankTitle}>
            {
              !this.props.isBankNameEditting &&
              <div
                className={style.bankName}
                style={!this.props.isBankNameEditting ? {'borderBottom': '1px solid grey'} : {}}
                onClick={() => this.props.handleBankNameEditToggle(true)}
              >
                {
                  this.props.bankName === '' &&
                  "Enter bank name"
                }
                {
                  this.props.bankName !== '' &&
                  this.props.bankName
                }
              </div>
            }
            {
              this.props.isBankNameEditting &&
              <div className={style.bankName}>
                <input
                  type="type"
                  placeholder="Bank Name"
                  contentEditable="true"
                  value={this.props.bankName}
                  style={{width: '60vw'}}
                  onChange={this.props.handleBankNameChange}
                >
                </input>
              </div>
            }
            <div className={style.bankEditButton}>
              {
                this.props.isBankNameEditting &&
                <i class="fa fa-check-square fa-2x" aria-hidden="true" onClick={() => this.props.handleBankNameEditToggle(false)}></i>
              }
            </div>
          </div>
          <div className={style.bankOptions}>
            {
              this.props.onCreate &&
              <ButtonGroup>
                <Button bsStyle="primary" onClick={this.props.discardChanges}>Discard</Button>
                <Button bsStyle="primary">Save Bank</Button>
              </ButtonGroup>
            }
            {
              !this.props.onCreate &&
              <ButtonGroup>
                <Button bsStyle="primary">Back to List</Button>
                <Button bsStyle="primary">Edit</Button>
                <Button bsStyle="primary">Create New</Button>
              </ButtonGroup>
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className={style.head}>
          <div className={style.bankTitle}>
            <div className={style.bankName}>
              Question Banks
            </div>
          </div>
          <div className={style.bankOptions}>
            <ButtonGroup>
              <Button bsStyle="primary" onClick={this.props.onCreateNewButtonClick}>Create New</Button>
            </ButtonGroup>
          </div>
        </div>
      );
    }
  }
}