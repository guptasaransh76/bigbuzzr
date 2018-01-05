import React from "react";
import style from "../../../css/login.css";
import Droplist from "./Droplist";
import {FormControl, Form, FormGroup, Col, Button, ControlLabel} from "react-bootstrap";

export default class Next extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }
  
  render() {
    return (

    <div>
        <Form horizontal>
          <FormGroup controlId="Questionname">
            <Col componentClass={ControlLabel} sm={2}>
              Question
            </Col>
            <Col sm={10}>
              <Droplist dataList={this.props.questions} label={"Select Question"} whenChanged={this.handleBankChange} />
            </Col>
          </FormGroup>

          <FormGroup controlId="NameBank">
            <Col componentClass={ControlLabel} sm={4}>
              Points Offered
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="points for this question" step="100" min="100" max="500" required/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="default">Ask</Button>
            </Col>
          </FormGroup>
        </Form>

    </div>
    );
  }
}
