import React from "react";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";
import {Link, Redirect} from "react-router";
import { joinQuiz } from "../api/axios";
import {Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, Jumbotron} from "react-bootstrap";
import $ from "jquery";
import style from "../../css/participant.css";

export default class Participant extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      gameTag: '',
      error: '',
      gameOn: false,
      invalidTag: false
    };
  }

  onChangeVal(key, value) {
    let state = {
      ...this.state
    };
    state[key] = value.target.value;
    this.setState(state);
    //console.log('state:', this.state);

  }

  letsQuiz = () => {
    console.log('Quiz clicked');

    let data = JSON.stringify({
      teamName: this.state.teamName,
      gameTag: this.state.gameTag
    })

    joinQuiz(data).then((response) => {
      console.log(response);

      if(response.data.status === 'success'){
        console.log('msg:', response);
        this.setState({
          ...this.state,
          gameOn: true
        });
      }
      else{
        this.setState({
          ...this.state,
          error: response.data.message,
          invalidTag: true
        });
        console.log('err:', this.state.error);
      }
    }).catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>


        { !this.state.gameOn &&

        <div>
          <div className={style.title}>
            <h1 style={{marginLeft: "15vw", marginTop: "5vw"}}>Let's Start the Quiz</h1>
          </div>
          <div className={style.back}>
            <Jumbotron>

              <Form horizontal>
                <div class="control-group">
                  <label class="control-label">Team Name</label>
                  <div>
                    <input className={style.input} type="text" placeholder="Your Unique Identification"
                           onChange={(val) => {this.onChangeVal("teamName", val)}} />
                  </div>
                </div>

                <div class="control-group" style={{marginTop: "1vh"}}>
                  <label class="control-label">Game Tag</label>
                  <div>
                    <input className={style.input} type="text" placeholder="Contain 5 Characters"
                           onChange={(val) => {this.onChangeVal("gameTag", val)}} />
                  </div>
                </div>

                <div class="control-group" style={{marginTop: "1vh"}}>
                  {this.state.invalidTag &&
                  <div style={{marginLeft: "1vw", color: "red"}}> {this.state.error} </div>
                  }
                  <div>
                    <Button style={{marginLeft: "1.3vw", marginTop: "2vh"}} onClick={this.letsQuiz}>Join Quiz</Button>
                  </div>

                </div>
              </Form>
            </Jumbotron>
          </div>
        </div>
        }


      </div>
    );
  }
}

