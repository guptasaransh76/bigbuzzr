import React from "react";
import style from "../../../css/login.css";
import Droplist from "./Droplist";
import {popListWithBank, popListWithQuestion, getAllBanks, nextQuestion} from "../../api/axios";

import {FormControl, Form, FormGroup, Col, Button, ControlLabel} from "react-bootstrap";

export default class Next extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // questions: [],
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
    };
  }

  componentWillMount() {
    console.log('Next - component is mounting');
    getAllBanks()
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
          console.log('banklist:', data)

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

    let bank_id = this.state.selectedBank;

    popListWithQuestion(bank_id)
      .then((response) => {
        console.log('in poplist', response);
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

  handleQuestionChange = (id) => {
    console.log('Question id changed:', id);
    this.setState({
      ...this.state,
      nextQuestion: id
    });
  }

  nextAskedQuestion = () => {
    console.log('Next Asked Question - clicked');

    let data = JSON.stringify({
      questionId: this.state.nextQuestion
    });
    console.log(data);

    nextQuestion(data).then((response) => {
      console.log(response);
      if (response.data.status === 'success') {
        this.setState({
          ...this.state,
          results: response.data.data[0],
        });

        console.log('Question Data:', this.state.results);
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
  };



  render() {
    return (

      <div>
        <Form horizontal>

          <FormGroup controlId="Bankid">
            <Col componentClass={ControlLabel} sm={2}>
              Bank ID
            </Col>
            <Col sm={10}>
              <Droplist dataList={this.state.bankList} label={"Select Question Bank"}
                        whenChanged={this.handleBankChange}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="Questionname">
            <Col componentClass={ControlLabel} sm={2}>
              Question
            </Col>
            <Col sm={10}>
              <Droplist dataList={this.state.questions} label={"Select Question"}
                        whenChanged={this.handleQuestionChange}/>
            </Col>
          </FormGroup>

          <div class="control-group">
            <Button style={{marginLeft: "2vw"}} onClick={this.nextAskedQuestion}>Ask</Button>
          </div>


          {/*<FormGroup controlId="NameBank">*/}
          {/*<Col componentClass={ControlLabel} sm={4}>*/}
          {/*Points Offered*/}
          {/*</Col>*/}
          {/*<Col sm={10}>*/}
          {/*<FormControl type="number" placeholder="points for this question" step="100" min="100" max="500"/>*/}
          {/*</Col>*/}
          {/*</FormGroup>*/}

        </Form>

      </div>
    );
  }
}
