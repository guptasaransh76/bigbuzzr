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
import style from "../../../css/body.css";

export default class Body extends React.Component {
  render() {
    return (
      <div>
        <div className={style.form}>
          <Form horizontal>
            <div class="control-group">
              <label class="control-label">Question</label>
              <div>
                <input className={style.input} type="text" placeholder="Question" value={this.props.ques}
                       onChange={this.props.handleQuestionChange}/>
              </div>
            </div>

            <div className={style.options}>
              <label style={{marginLeft: "-0.15vw"}}>Options</label>
              <div>
                {this.props.options.map((option, idx) => (
                  <div key={'bankId' + idx}>
                    <div class="input-prepend input-append" style={{width: "48vw", marginBottom: "1vh"}}>

                      <input type="radio"
                             checked={this.props.optionChecked === idx}
                             onChange={(event) => this.props.onOptionCheckedChange(idx)}
                             className={style.radio}
                      />

                      <input type="text" placeholder={`Option ${idx + 1}`}
                             value={option.opName}
                             onChange={this.props.handleOptionNameChange(idx)}
                             className={style.optionText}
                             required="true"
                      />

                      <i
                        className={"fa fa-times fa-lg " + style.delButton}
                        aria-hidden="true"
                        onClick={this.props.handleRemoveOption(idx)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={style.addButton}>
                <Button
                  onClick={this.props.handleAddOption}
                  disabled={this.props.options && this.props.options.length >= 4}
                >
                  ADD
                </Button>
              </div>
              <div style={{marginLeft: "2vw"}}>
                <Button
                  bsStyle="success"
                  disabled={(this.props.bankName === '' || this.props.options.length < 4)}
                  onClick={this.props.handleSubmit}>
                  Submit Question
                </Button>
              </div>
            </div>

            {
              this.props.error &&
              <div style={{color: 'red'}}>
                {this.props.error}
              </div>
            }
          </Form>
        </div>
      </div>
    );
  }
}