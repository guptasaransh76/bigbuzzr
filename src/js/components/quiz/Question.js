import React from "react";
import {FormControl, Form, FormGroup, Col, Button, ControlLabel, Jumbotron} from "react-bootstrap";
import { generateGameTag } from "../../api/axios";
import style from "../../../css/question.css";

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTag: '',
      gameOn: false
    };
  }


  render() {
    return (

      <div>

        <Jumbotron style={{marginLeft: "20vw", marginRight: "20vw"}}>
          <div class="container">

              <div class="row">
                <div class="col-lg-12">
                  <div class="col-sm-12">
                    <strong><label class="control-label">Question</label></strong>
                  </div>

                  <div class="col-sm-12">
                    <Button className={style.option1}>Option 1</Button>
                    <Button className={style.option2}>Option 2</Button>
                  </div>

                  <div class="col-sm-12">
                    <Button className={style.option3}>Option 3</Button>
                    <Button className={style.option4}>Option 4</Button>
                  </div>
                </div>
              </div>

          </div>
        </Jumbotron>

      </div>
    );
  }
}
