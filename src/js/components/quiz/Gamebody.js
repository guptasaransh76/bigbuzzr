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
import Next from "../../components/layout/Next";
import style from "../../../css/body.css";

export default class Gamebody extends React.Component {
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
      alreadyAsked: {},
      players: {},
      kickedPlayers: [],
      current: [],
      answer: '',
      data: ''
    };
  }

  render() {

    return (
      <div>
        <div class="row">
          <div class="col-md-11">
            <div class="card">
              <div class="card-body">
                <div className={style.form}>
                  <p class="card-text">Players: </p>
                  <Next/>
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>
    );
    // Object.keys(this.props.gameResults.players).map((type) => {
    //   console.log(type)
    //   return (
    //     <p>Type of phone: {type}</p>
    //   )
    // })
  }
}

// Object
// alreadyAsked
//   :
// {14: 1}
// current
//   :
// {question: {…}, answer: 1, players: {…}}
// kickedPlayers
//   :
//   []
// players
//   :
// {abc: 0}
// questions
//   :
//   []
// serverTime
//   :
//   1525442486505
// __proto__
//   :
//   Object