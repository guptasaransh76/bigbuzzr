import React from "react";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";
import {Link, Redirect} from "react-router";
import {popListWithBank, popListWithQuestion, getAllBanks, getAllQuiz, startGame, quitCurrentQuiz} from "../api/axios";
import Next from "../components/layout/Next";
import Droplist from "../components/layout/Droplist";
import $ from "jquery";
import {ControlLabel, FormControl, Form, FormGroup, Col, Jumbotron, Button} from "react-bootstrap";
import style from "../../css/layout.css";


export default class Game extends React.Component {
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
      }],
      gameOn: false,
      inGame: false,
      gameTag: '',
      results: undefined
    };
  }

  componentWillMount() {
    console.log('Quiz - component is mounting');
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

    getAllQuiz()
      .then((response) => {

        if (response.data.status === 'success') {
          const data = response.data.data[0];
          console.log('success', data);

          let quizId = data.quiz_id.toString();
          let quizHash = data.quiz_hash.toString();

          const tag = quizId.concat(quizHash);


          if (data.is_finished === 'incomplete') {
            this.setState({
              ...this.state,
              gameOn: true,
              gameTag: tag,
              results: data
            });
            console.log('quiz running:', this.state);

          } else if (data.is_finished === 'complete') {
            console.log('complete');
            this.setState({
              ...this.state,
              results: data,
              // isFinished: this.state.results.is_finished === 'complete',
            });

            console.log('quiz not running:', this.state.results);

          }


        } else {
          this.setState({
            ...this.state,
            results: ''
          });
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          results: ''
        });
      });

      startGame()
        .then((response) => {
          console.log(response);
          if (response.data.status === 'success') {

            const data = response.data.data;
            console.log('success', data);

            this.setState({
              ...this.state,
              results: data,
              inGame: true
              // isFinished: this.state.results.is_finished === 'complete',
            });

            browserHistory.push('/game');

            console.log('results:', this.state.results);

          } else {
            this.setState({
              ...this.state,
              results: ''
            });
          }
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            results: ''
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
    console.log(this.state.selectedBank);
    popListWithQuestion(this.state.selectedBank)
      .then((response) => {
        console.log('in poplist',response);
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

  handleQuit(){
    console.log('Quit was Clicked');
    quitCurrentQuiz()
      .then((response) => {

        if (response.data.status === 'success') {
          const data = response.data.data;
          console.log('success', data);

          browserHistory.push('/quiz');

          // this.setState({
          //   ...this.state,
          //   gameOn: false,
          //   inGame: false
          // });
          //   if(data.isCompleted){
          //   console.log('the Quiz was succesfully over.');

          //   console.log('quiz not running:', this.state);
          //
          // }


        } else {
          console.log('in else');
          // this.setState({
          //   ...this.state,
          //   results: ''
          // });
        }
      })
      .catch((err) => {
        console.log('in catch');
        // this.setState({
        //   ...this.state,
        //   results: ''
        // });
      });
  }


  render() {

    return (
      <div>
        <h3 style={{marginLeft: "4vw"}}>Let's Start</h3>
        <Button onClick={this.handleQuit}>Quit Quiz</Button>

        <p>{JSON.stringify(this.state)}</p>
        <div className={style.main_panel}>
            <div>
            <p>Game Tag: {this.state.gameTag}</p>
            <p>Already Asked Questions: </p>
            <p>Players: </p>
            <p>Question: </p>
            </div>

            {/*<FormGroup controlId="NameBank">*/}
              {/*<Col componentClass={ControlLabel} sm={2}>*/}
                {/*Name*/}
              {/*</Col>*/}
              {/*<Col sm={10}>*/}
                {/*<FormControl type="text" value={this.state.value} placeholder="Name" onChange={this.handleChange}/>*/}
              {/*</Col>*/}
            {/*</FormGroup>*/}

            <Next
              questions={this.state.questions}
              whenChanged={this.handleBankChange}
            />

            {/*<FormGroup controlId="Bankid">*/}
              {/*<Col componentClass={ControlLabel} sm={2}>*/}
                {/*Bank ID*/}
              {/*</Col>*/}
              {/*<Col sm={10}>*/}
                {/*<Droplist dataList={this.state.bankList} label={"Select Question Bank"}*/}
                          {/*whenChanged={this.handleBankChange}/>*/}
                {/*/!*<Button bsStyle="default" onClick={this.handleQuizStart}>Submit</Button>*!/*/}
              {/*</Col>*/}
            {/*</FormGroup>*/}

            {/*<FormGroup>*/}
              {/*<Col smOffset={2} sm={10}>*/}
                {/*<Button bsStyle="default" onClick={this.handleQuizStart}>Submit</Button>*/}
              {/*</Col>*/}
            {/*</FormGroup>*/}
          {/*{*/}
            {/*this.state.isStarted &&*/}
            {/*<Next*/}
              {/*questions={this.state.questions}*/}
              {/*whenChanged={this.handleBankChange}*/}
            {/*/>*/}
          {/*}*/}
        </div>
      </div>
    );
  }
}

