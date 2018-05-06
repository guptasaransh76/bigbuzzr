import React from "react";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";
import {Link, Redirect} from "react-router";
import {popListWithBank, popListWithQuestion, getAllBanks, getAllQuiz, startGame, quitCurrentQuiz} from "../api/axios";
import Next from "../components/layout/Next";
import Droplist from "../components/layout/Droplist";
import Header from "../components/quiz/Gameheader";
import Sidebar from "../components/quiz/Playerbar";
import Body from "../components/quiz/Gamebody";
import $ from "jquery";
import {ControlLabel, FormControl, Form, FormGroup, Col, Jumbotron, Button} from "react-bootstrap";
import style from "../../css/bank.css";


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
      results: undefined,
      questionResults: undefined,
      gameResults: undefined
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
        console.log('in start game');
        console.log(response);
        if (response.data.status === 'success') {

          const data = response.data.data;
          console.log('success', data);

          this.setState({
            ...this.state,
            gameResults: data,
            inGame: true
            // isFinished: this.state.results.is_finished === 'complete',
          });
          console.log('GameData', this.state.gameResults);

        } else {
          this.setState({
            ...this.state,
            gameResults: ''
          });
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          gameResults: ''
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

  handleQuit() {
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
        {/*<div class="row">*/}
          {/*<div class="col-lg-8" style={{marginLeft: "5vw"}}>*/}
            {/*<h3 class="card-title" style={{marginLeft: "15.5vw", marginTop: "0.5vh"}}>Let's Start</h3>*/}
          {/*</div>*/}
          {/*<div class="col-lg-3">*/}
              {/*<Button class="btn btn-danger" onClick={this.handleQuit} style={{marginTop: "0.5vh"}}>Quit Quiz</Button>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*<div className={style.main_panel}>*/}
          {/*<div style={{marginLeft: "2vw"}}>*/}
            {/*<p class="card-text">Game Tag: {this.state.gameTag}</p>*/}
            {/*<p class="card-text">Already Asked Questions: </p>*/}
            {/*<p class="card-text">Players: </p>*/}
            {/*<p class="card-text">Question: </p><br />*/}
          {/*</div>*/}
          {/**/}

          {/*<Next*/}
            {/*questions={this.state.questions}*/}
            {/*whenChanged={this.handleBankChange}*/}
          {/*/>*/}
          {/**/}
        {/*</div>*/}

        <Header
          handleQuit = {this.handleQuit}
          gameTag= {this.state.gameTag }
        />

        <div className={style.partition}>
          <div className={style.left}>
            <Sidebar
            />
          </div>

          <div className={style.right}>
            <Body
              gameResults={this.state.gameResults}
            />
          </div>
        </div>
      </div>
    );
  }
}

