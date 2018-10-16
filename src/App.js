import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import LogIn from "./components/LogIn";
import NavBar from "./components/Navbar";
import Home from "./components/Home/Home";
import Course from "./components/Course/Course";
import Assignment from "./components/Assignment/Assignment";
import CreateAssignment from "./components/Assignment/CreateAssignment";
import EditAssignment from "./components/Assignment/EditAssignment";
import StudentAssignment from "./components/Assignment/StudentAssignment";
import AssignmentsToGrade from "./components/Assignment/AssignmentsToGrade";
import StudentAssignmentToGrade from "./components/Assignment/StudentAssignmentToGrade";
import { updateUser, getUserFromToken } from "./redux/actions/userActions";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.props.getUserFromToken(token);
    }
  }

  render() {
    return (
      <div>
        {this.props.user ? <NavBar /> : <LogIn />}
        <Switch>
          <Route
            path="/course/:id/assignment/create"
            component={CreateAssignment}
          />
          <Route
            path="/course/:id/assignment/:id/student/:id"
            component={StudentAssignment}
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
          <Route exact path="/course/:id" component={Course} />
          <Route path="/home" component={Home} />
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
