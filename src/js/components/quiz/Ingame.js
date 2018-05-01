import React from "react";
import style from "../../../css/login.css";
import Next from "../../components/layout/Next";
import {FormControl, Form, FormGroup, Col, Button, ControlLabel, Jumbotron} from "react-bootstrap";
import {nextQuestion, getCurrentQuiz} from "../../api/axios";

export default class Ingame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bankList: [{
        bankId: '',
        bankName: ''
      }],
      value: '',
      selectedBank: '',
      nextQuestion: '',
      isStarted: false,
      questions: [{
        quesId: '',
        quesName: ''
      }],
      started: false
    };
  }

  handleStart = () => {
    console.log('start click:', this.state);
    this.setState({
      ...this.state,
      started: true
    });
    getCurrentQuiz()
      .then((response) => {
        console.log(response);
        if (response.data.status === 'success') {
          this.setState({
            ...this.state,
            results: response.data.data
          });
          console.log('get all quiz',this.state.results);
        } else {
          console.log("in else");
          this.setState({
            ...this.state,
            results: undefined
          });
        }
      })
      .catch((err) => {
        console.log("in catch");
        this.setState({
          ...this.state,
          results: undefined
        });
      });
  }

  render() {
    return (

      <div>

        <div>
          <Jumbotron style={{paddingLeft: "5vw", paddingRight: "5vw"}}>
            <div class="panel">

                <div class="control-group">
                  <p style={{marginTop: "4vh", marginLeft: "1vw"}}>Please use <strong>{this.props.results}</strong> to
                    join the quiz</p>
                </div>
              {
                !this.state.started &&
                <Button onClick={this.handleStart}> Start </Button>
              }
              {
                this.state.started &&
                <div>
                  <p>akv</p>
                </div>
              }


            </div>
          </Jumbotron>
        </div>




      </div>
    );
  }
}
