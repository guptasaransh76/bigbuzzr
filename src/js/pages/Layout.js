import React from "react";
import {Link, Redirect} from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";
import style from "../../css/layout.css";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: props.location.pathname.includes('login') ? false : true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      isVisible: nextProps.location.pathname.includes('login') ? false : true
    })
  }

  render() {
    const {location} = this.props;
    return (
      <div className={style.page}>
        {
          this.state.isVisible &&
          <div className={style.head}>
            <Nav location={location}/>
          </div>
        }

        <div className={style.body}>
              {this.props.children}
        </div>
        {
          this.state.isVisible &&
          <div className={style.foot}>
            <Footer/>
          </div>
        }
      </div>


    );
  }
}
