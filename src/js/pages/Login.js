import React from "react";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {Link, Redirect} from "react-router";
import { login, isAuthenticated } from "../api/axios";
import {Form, FormGroup, Col, FormControl, Checkbox, Button, ControlLabel, Jumbotron} from "react-bootstrap";
import style from "../../css/login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  onChangeVal(key, value) {
    let state = {
      ...this.state
    };
    state[key] = value.target.value;

    this.setState(state);
  }


  SignIn = () => {
    console.log('login clicked')
    let data = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })

    login(data).then((response) => {
        console.log(response);

        if (response.data.status === 'success') {
          this.setState({
            ...this.state,
            password: '',
            error: ''
          });

          if (this.props.location.state &&
              this.props.location.state !== null) {
            return browserHistory.push(this.props.location.state.nextState);
          }

          return browserHistory.push('/bank');
        } else {
          this.setState({
            ...this.state,
            password: '',
            error: response.data.message
          });
        }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    return (
      <div className={style.form}>
        <div className={style.label}>
          <h2><a href="/" style={{textDecoration: "none", color: "black"}}>BigBuzzr</a></h2>
        </div>
        <Jumbotron style={{paddingLeft: "1vw", paddingRight: "1vw"}}>
          <Form horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl type="email" id="username" placeholder="Email Address" onChange={(val) => {
                  this.onChangeVal("username", val)
                }}/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" id="password" placeholder="Password" onChange={(val) => {
                  this.onChangeVal("password", val)
                }}/>
              </Col>
            </FormGroup>

            {
              this.state.error &&
              <FormGroup>
                <Col componentClass={ControlLabel} sm={10} style={{color: 'red'}}>
                  {this.state.error}
                </Col>
              </FormGroup>
            }


            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button onClick={this.SignIn}>Sign In</Button>
              </Col>
            </FormGroup>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}

