import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {Link, Redirect} from "react-router";
import {popListWithBank, popListWithQuestion} from "../api/axios";
import Next from "../components/layout/Next";
import Droplist from "../components/layout/Droplist";
import $ from "jquery";
import {ControlLabel, FormControl, Form, FormGroup, Col, Jumbotron, Button} from "react-bootstrap";
import style from "../../css/login.css";


export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bankList: [{
        bankId: '',
        bankName: ''
      }],
      value: '',
      selectedBank: '',
      isStarted: false,
      questions: [{
        quesId: '',
        quesName: ''
      }]
    };
  }

  componentWillMount() {
    console.log('Quiz - component is mounting');
    popListWithBank()
      .then((response) => {
        console.log(response);
        if (response.data.status === 'success') {
          let bankList = [];
          const data = response.data.data;
          for (let i = 0; i < data.length; i++) {
            bankList.push({
              id: data[i].bank_id,
              name: data[i].bank_name
            });
          }

          this.setState({
            ...this.state,
            bankList
          });
        } else {
          this.setState({
            ...this.state,
            bankList: []
          });
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          bankList: []
        });
      });
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange = (evt) => {
    this.setState({
      ...this.state,
      value: evt.target.value
    });
  }

  handleBankChange = (id) => {
    console.log('bank id changed:', id);
    this.setState({
      ...this.state,
      selectedBank: id
    });
  }

  handleQuizStart = (evt) => {
    console.log('submit clicked.');
    this.setState({
      ...this.state,
      isStarted: true
    });

    popListWithQuestion(this.state.selectedBank)
      .then((response) => {
        console.log(response);
        if (response.data.status === 'success') {
          let questions = [];
          const data = response.data.data;
          for (let i = 0; i < data.length; i++) {
            questions.push({
              id: data[i].question_id,
              name: data[i].question
            });
            console.log(questions);
          }

          this.setState({
            ...this.state,
            questions
          });
        } else {
          this.setState({
            ...this.state,
            questions: []
          });
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          questions: []
        });
      });
    
  }

  render() {

    return (
      <div className={style.jumbo}>
        <h3>Let's Start</h3>
        <Jumbotron style={{paddingLeft: "5vw", paddingRight: "5vw"}}>
          <Form horizontal>
            <FormGroup controlId="NameBank">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl type="text" value={this.state.value} placeholder="Name" onChange={this.handleChange}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="Bankid">
              <Col componentClass={ControlLabel} sm={2}>
                Bank ID
              </Col>
              <Col sm={10}>
                <Droplist dataList={this.state.bankList} label={"Select Question Bank"}
                          whenChanged={this.handleBankChange}/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button bsStyle="default" onClick={this.handleQuizStart}>Submit</Button>
              </Col>
            </FormGroup>
          </Form>
          {
            this.state.isStarted &&
            <Next
              questions={this.state.questions}
              whenChanged={this.handleBankChange}
            />
          }
        </Jumbotron>
      </div>
    );
  }
}

