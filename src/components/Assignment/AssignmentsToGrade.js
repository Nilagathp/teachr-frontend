import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";

const styles = {
  paper: {
    margin: "20px"
  },
  card: {
    margin: "20px",
    maxWidth: 400
  },
  heading: {
    padding: "20px"
  },
  button: {
    paddingLeft: "20px"
  }
};

const AssignmentsToGrade = ({ studentAssignments }) => {
  return <React.Fragment />;
};

const mapStateToProps = (state, ownProps) => {
  let studentAssignments;
  if (state.user && state.user.person.teacher) {
    const assignmentId = parseInt(ownProps.match.url.split("/")[4]);
    studentAssignments = state.students
      .map(student => student.student_assignments)
      .flat()
      .filter(
        studentAssignment => studentAssignment.assignment_id === assignmentId
      );
  }
  return {
    studentAssignments: studentAssignments
  };
};

const styledAssignmentsToGrade = withStyles(styles)(AssignmentsToGrade);
export default withRouter(connect(mapStateToProps)(styledAssignmentsToGrade));
