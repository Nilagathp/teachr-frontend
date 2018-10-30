import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import RaisedButton from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import { logInUser } from "../redux/actions/userActions";
import { removeError } from "../redux/actions/errorActions";

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
  },
  error: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing.unit
  }
});

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
    const userParams = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.logInUser(userParams);
    this.props.history.push("/home");
  };

  render() {
    const { error, removeError, classes } = this.props;

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
            {error ? (
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                open
                autoHideDuration={3000}
                onClose={removeError}
              >
                <SnackbarContent
                  variant="h6"
                  className={classes.error}
                  message="Invalid email or password"
                />
              </Snackbar>
            ) : null}
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

const mapStateToProps = state => {
  return {
    error: state.error
  };
};

const styledLogIn = withStyles(styles)(LogIn);
export default withRouter(
  connect(
    mapStateToProps,
    { logInUser, removeError }
  )(styledLogIn)
);
