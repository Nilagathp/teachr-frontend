import React, { Component } from "react";
import LogIn from "./components/LogIn";
import NavBar from "./components/Navbar";

class App extends Component {
  logout = () => {
    localStorage.clear();
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

export default App;
