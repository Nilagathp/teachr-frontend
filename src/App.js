import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import LogIn from "./components/LogIn";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import TeacherCourse from "./components/TeacherCourse";
import { updateUser, getUserFromToken } from "./redux/actions/userActions";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.getUserFromToken(token);
    }
  }

  logout = () => {
    localStorage.clear();
    this.props.updateUser(null);
  };

  render() {
    return (
      <div>
        {this.props.user ? (
          <NavBar
            loggedIn={!!this.props.user}
            logout={this.logout}
            user={this.props.user}
          />
        ) : null}
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={LogIn} />
          {this.props.user && this.props.user.person.teacher ? (
            <Route exact path="/course/:id" component={TeacherCourse} />
          ) : null}
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
