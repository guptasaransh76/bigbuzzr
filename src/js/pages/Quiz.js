import React from "react";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";
import {Link, Redirect} from "react-router";
import {
  popListWithBank,
  popListWithQuestion,
  getAllBanks,
  generateGameTag,
  getAllQuiz,
  quitCurrentQuiz,
  startGame,
  getRecentQuiz
} from "../api/axios";
import Next from "../components/layout/Next";
import Droplist from "../components/layout/Droplist";
import Gametag from "../components/quiz/Gametag";
import Ingame from "../components/quiz/Ingame";
import $ from "jquery";
import {ControlLabel, FormControl, Form, FormGroup, Col, Jumbotron, Button} from "react-bootstrap";
import style from "../../css/layout.css";


export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTag: '',
      gameOn: false,
      inGame: false,
      isFinished: false,
      results: undefined,
      quit: undefined
    };
  }

  refreshQuiz = () => {
    getAllQuiz()
      .then((response) => {

        if (response.data.status === 'success') {
          const data = response.data.data[0];
          console.log('success', data);

          let quizId = data.quiz_id.toString();
          let quizHash = data.quiz_hash.toString();

          const tag = quizId.concat(quizHash);


          if(data.is_finished === 'incomplete'){
            this.setState({
              ...this.state,
              gameOn: true,
              gameTag: tag,
              results: data
            });
            console.log('quiz running:', this.state);

          }else if(data.is_finished === 'complete'){
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
  }

  componentWillMount() {
    console.log('Quiz - component is mounting');

    this.refreshQuiz();

  }

  generateTag = () => {
    console.log('Generate Tag - clicked');

    generateGameTag().then((response) => {
      console.log(response);
      if (response.data.status === 'success') {

        // let quizId = response.data.data[0].quiz_id.toString();
        // let quizHash = response.data.data[0].quiz_hash.toString();
        //
        // const tag = quizId.concat(quizHash);
        this.setState({
          ...this.state,
          gameOn: true
        });


        console.log('the gametag is:', response.data.data.gameTag);
        this.refreshQuiz();
      }
      else {
        console.log("in else");
        this.setState({
          ...this.state,
          results: ''
        });
      }
    })
      .catch((err) => {
        console.log("in catch");
        this.setState({
          ...this.state,
          results: ''
        });
      });
  };


  // quitQuiz() {
  //   console.log('Quit -- clicked');
  //

  // }

  Game = () => {
    console.log("Game -- Clicked");

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

  render() {

    return (


      <div>
        {
          !this.state.gameOn &&
            <div className={style.main_panel}>
              <p>no game running</p>
              <Button onClick={this.generateTag}>Generate Tag</Button>
            </div>
        }
        {
          this.state.gameOn &&
          <div className={style.main_panel}>
            <p>Game Running. Use {this.state.gameTag} to join the Quiz.</p>
            {
              !this.state.inGame &&
              <div>
                <p>Game Details:</p>
                <p>Quiz Id: {this.state.results.quiz_id}</p>
                <p>Quiz Hash: {this.state.results.quiz_hash}</p>
                <p>Created On: {this.state.results.creation_date}</p>
                <Button onClick={this.Game}>Continue Game</Button>
                {/*<p>{JSON.stringify(this.state)}</p>*/}
              </div>
            }
            {/*{*/}
              {/*this.state.inGame &&*/}
              {/*<div>*/}
                {/*<p>{JSON.stringify(this.state)}</p>*/}
                {/*<p>Game Tag: {this.state.gameTag}</p>*/}
                {/*<p>Already Asked Questions: </p>*/}
                {/*<p>Players: </p>*/}
                {/*<p>Question: </p>*/}
                {/*<Button onClick={this.handleQuit}>Quit Quiz</Button>*/}
                {/**/}
              {/*</div>*/}

            {/*}*/}

          </div>
        }


      </div>


    );
  }
}

