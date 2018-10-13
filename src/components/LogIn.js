import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import RaisedButton from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { logInUser } from "../redux/actions/userActions";

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: ""
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const userParams = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.logInUser(userParams);
    this.props.history.push("/home");
  };

  render() {
    return (
      <Grid container justify="center">
        <form onSubmit={this.handleSubmit}>
          {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
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

export default withRouter(
  connect(
    null,
    { logInUser }
  )(LogIn)
);
