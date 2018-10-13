import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import LogIn from "./components/LogIn";
import NavBar from "./components/Navbar";
import Home from "./components/Home/Home";
import Course from "./components/Course/Course";
import Assignment from "./components/Assignment/Assignment";
import { updateUser, getUserFromToken } from "./redux/actions/userActions";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.getUserFromToken(token);
    }
  }

  render() {
    return (
      <div>
        {this.props.user ? <NavBar /> : null}
        <Switch>
          <Route path="/course/:id/assignment/:id" component={Assignment} />
          <Route path="/course/:id" component={Course} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={LogIn} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { updateUser, getUserFromToken }
  )(App)
);
