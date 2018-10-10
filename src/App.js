import React, { Component } from "react";
import LogIn from "./components/LogIn";
import NavBar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <LogIn />
      </div>
    );
  }
}

export default App;
