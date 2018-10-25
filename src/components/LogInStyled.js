import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import RaisedButton from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { logInUser } from "../redux/actions/userActions";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LogInStyled extends React.Component {
  state = {
    email: "",
    password: ""
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
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const styledLogInStyled = withStyles(styles)(LogInStyled);
export default withRouter(
  connect(
    null,
    { logInUser }
  )(styledLogInStyled)
);
