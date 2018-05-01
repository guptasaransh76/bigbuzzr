import React from "react";
import style from "../../../css/login.css";
import {FormControl, Form, FormGroup, Col, Button, ControlLabel, Jumbotron} from "react-bootstrap";

export default class Gametag extends React.Component {

  render() {
    return (

      <div>
        <Jumbotron style={{paddingLeft: "5vw", paddingRight: "5vw"}}>
          <Form horizontal>
            <h3>Let's Start</h3>
            <div class="control-group">
              <label class="control-label">Game Tag:</label>
              <Button style={{marginLeft: "2vw"}} onClick={this.props.generateTag}>Generate</Button>
              <div class="control-group">
                <p style={{marginTop: "4vh", marginLeft: "1vw"}}>Please use <strong>{this.props.gameTag}</strong> to
                  join the quiz</p>
                <Button onClick={this.props.quitQuiz}> Quit </Button>

              </div>
            </div>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}
