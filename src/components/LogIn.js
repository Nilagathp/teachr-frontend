import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import RaisedButton from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { updateUser } from "../redux/actions/userActions";

class LogIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const url = "http://localhost:3000/login";
    const params = {
      email: this.state.email,
      password: this.state.password
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ user: params }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(response => {
        localStorage.setItem("token", response.jwt);
        this.props.updateUser(response.user);
        this.setState({ email: "", password: "" });
        this.props.history.push("/home");
      });
  };

  render() {
    return (
      <Grid container justify="center">
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={{ display: "block" }}
            required
            label="Email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange("email")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            style={{ display: "block" }}
            required
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange("password")}
            margin="normal"
            variant="outlined"
          />
          <RaisedButton
            style={{ display: "block" }}
            variant="outlined"
            type="submit"
          >
            Log In
          </RaisedButton>
        </form>
      </Grid>
    );
  }
}

export default connect(
  null,
  { updateUser }
)(LogIn);
