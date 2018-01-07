import React from "react";
import { IndexLink, Link, browserHistory } from "react-router";
import style from "../../../css/nav.css";
import { Navbar } from "react-bootstrap";
import { isAuthenticated, logout } from "../../api/axios";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      atGamePlay: false,
      inQuiz: props.location.pathname.includes('quiz'),
      inBank: props.location.pathname.includes('bank'),
      user: undefined
    };
  }

  componentWillMount() {
    isAuthenticated()
      .then((response) => {
        if (response.data.status === 'success') {
          this.setState({
            ...this.state,
            user: response.data.data
          });
        } else {
          this.setState({
            ...this.state,
            user: undefined
        });
        }
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          user: undefined
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      inQuiz: nextProps.location.pathname.includes('quiz'),
      inBank: nextProps.location.pathname.includes('bank')
    });
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  logout = (evt) => {
    logout()
      .then(
        (response) => {
          if (response.data.status === 'success') {
            this.setState({
              ...this.state,
              user: undefined
            });
            return browserHistory.push('/');
          } else {
            console.log(response.data.message);
            return;
          }
        }
      )
      .catch(
        (err) => console.log(err)
      );
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const loginClass = location.pathname === "/" ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <div className={style.nav}>
        <div className={style.title}>
          <a href="/" style={{color: "white", textDecoration: "none"}}><h2>BigBuzzr</h2></a>
        </div>
        <div
          className={style.item}
          onClick={() => {return this.state.inQuiz ? this.setState({...this.state, atGamePlay: !this.state.atGamePlay}) : null;}}
        >
          {
            this.state.user &&
            <span className={style.nonNavItems}>{this.state.user.name}</span>
          }
          { !this.state.inQuiz &&
            <Link to="quiz" className={style.navItems} onClick={this.toggleCollapse.bind(this)}>Quiz</Link>
          }
          { !this.state.inBank &&
            <Link to="bank" className={style.navItems} onClick={this.toggleCollapse.bind(this)}>Question Banks</Link>
          }
          {
            !this.state.user &&
            <Link to="login" className={style.navItems} onClick={this.toggleCollapse.bind(this)}>Login</Link>
          }
          {
            this.state.user &&
            <a className={style.navItems} style={{color:"#dddddd"}} onClick={this.logout}>Logout</a>
          }
        </div>
        { this.state.atGamePlay &&
          <div className={style.scorecard}>
            <div className={style.score}>
              100
            </div>
            <div className={style.score}>
              200
            </div>
            <div className={style.score}>
              502
            </div>
          </div>
        }

      </div>
    );
  }
}