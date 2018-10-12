import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import LogIn from "./components/LogIn";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import { updateUser, getUserFromToken } from "./redux/actions/userActions";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    getUserFromToken(token);
  }

  logout = () => {
    localStorage.clear();
    updateUser(null);
  };

  render() {
    return (
      <div>
        <NavBar loggedIn={!!this.props.user} logout={this.logout} />
        <Switch>
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
