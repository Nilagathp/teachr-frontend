import React, { Component } from "react";
import { connect } from "react-redux";
import LogIn from "./components/LogIn";
import NavBar from "./components/Navbar";

import { updateUser } from "./redux/actions/userActions";

class App extends Component {
  logout = () => {
    localStorage.clear();
    this.props.updateUser(null);
  };

  render() {
    return (
      <div>
        <NavBar logout={this.logout} />
        <LogIn />
      </div>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(App);
