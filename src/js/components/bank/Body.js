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

export default class Body extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Question
              </Col>
              <Col sm={12}>
                <FormControl type="text" placeholder="question" value={this.props.ques}
                             onChange={this.props.handleQuestionChange}/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Options
              </Col>
            </FormGroup>
          </Form>


          <div className={style.addop}>

            {this.props.options.map((option, idx) => (
              <form key={"bank_form_options_" + idx}>
                <FormGroup style={{width: "48vw", marginLeft: "1vw"}}>
                  <InputGroup>
                    <InputGroup.Addon>
                      <input
                        type="radio"
                        checked={this.props.optionChecked === idx}
                        onChange={(event) => this.props.onOptionCheckedChange(idx)}
                      />
                    </InputGroup.Addon>
                    <FormControl type="text" placeholder={`Option ${idx + 1}`}
                                 value={option.opName}
                                 onChange={this.props.handleOptionNameChange(idx)}/>
                    <InputGroup.Button>
                      <Button onClick={this.props.handleRemoveOption(idx)}>DEL</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </form>
            ))}

            <Form horizontal>

              <FormGroup>
                <Col sm={2}>
                  <Button
                    onClick={this.props.handleAddOption}
                    disabled={this.props.options.length >= 4}
                  >
                    ADD
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup style={{marginLeft: "2vw"}}>
                <Col>
                  <Button
                    bsStyle="success"
                    disabled={(this.props.bankName === '' || this.props.options.length < 4)}
                    onClick={this.props.handleSubmit}>
                    Submit Question
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>

          {
            this.props.error &&
            <FormGroup>
              <Col componentClass={ControlLabel} sm={10} style={{color: 'red'}}>
                {this.props.error}
              </Col>
            </FormGroup>
          }


        </div>
      </div>
    );


  }
}