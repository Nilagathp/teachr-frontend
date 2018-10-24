import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";

import LogIn from "./components/LogIn";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home/Home";
import Assignment from "./components/Assignment/Assignment";
import CreateAssignment from "./components/Assignment/Teacher/CreateAssignment";
import EditAssignment from "./components/Assignment/Teacher/EditAssignment";
import AssignmentsToGrade from "./components/Assignment/Teacher/AssignmentsToGrade";
import StudentAssignmentToGrade from "./components/StudentAssignment/StudentAssignmentToGrade";
import { updateUser, getUserFromToken } from "./redux/actions/userActions";

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginLeft: 180,
    minHeight: 820
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.getUserFromToken(token);
    }
  }

  render() {
    const { classes, user } = this.props;
    let courses;
    if (user && user.person.teacher) {
      courses = user.person.teacher.courses;
    } else if (user) {
      courses = user.person.student.courses;
    }
    return user && courses ? (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <Navbar handleClick={this.handleClick} />
          <Sidebar courses={courses} />
        </div>
        <Paper className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route
              path="/course/:id/assignment/create"
              component={CreateAssignment}
            />
            <Route
              path="/course/:id/assignment/:id/grade/student/:id"
              component={StudentAssignmentToGrade}
            />
            <Route
              path="/course/:id/assignment/:id/grade"
              component={AssignmentsToGrade}
            />
            <Route
              path="/course/:id/assignment/:id/edit"
              component={EditAssignment}
            />
            <Route
              exact
              path="/course/:id/assignment/:id"
              component={Assignment}
            />
            <Route exact path="/course/:id" component={Home} />
            <Route path="/home" component={Home} />
          </Switch>
        </Paper>
      </>
    ) : (
      <LogIn />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const styledApp = withStyles(styles)(App);
export default withRouter(
  connect(
    mapStateToProps,
    { updateUser, getUserFromToken }
  )(styledApp)
);
