import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { createStudentAssignment } from "../../../redux/actions/studentAssignmentActions";

const styles = {
  paper: {
    margin: "20px"
  },
  card: {
    margin: "20px",
    maxWidth: 400
  },
  heading: {
    marginLeft: "20px",
    marginTop: "20px",
    paddingTop: "20px"
  },
  button: {
    paddingLeft: "20px"
  },
  text: {
    marginLeft: "20px",
    paddingBottom: "10px"
  }
};

class StudentViewAssignment extends React.Component {
  render() {
    const { user, course, assignment, studentAssignment, classes } = this.props;
    if (assignment) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h4" className={classes.heading}>
            {assignment.name}
            {studentAssignment ? (
              studentAssignment.status === "in_progress" ||
              studentAssignment.status === "not_started" ? (
                <Button
                  color="primary"
                  component={Link}
                  to={`/course/${course.id}/assignment/${
                    assignment.id
                  }/student/${user.person.student.id}`}
                >
                  Continue Assignment
                </Button>
              ) : (
                <Button
                  color="primary"
                  component={Link}
                  to={`/course/${course.id}/assignment/${
                    assignment.id
                  }/student/${user.person.student.id}`}
                >
                  View Assignment
                </Button>
              )
            ) : (
              <Button
                className={classes.button}
                color="primary"
                onClick={() =>
                  this.props.createStudentAssignment(
                    user.person.student.id,
                    assignment.id,
                    course.id,
                    this.props.history.push
                  )
                }
              >
                Begin Assignment
              </Button>
            )}
          </Typography>
          <Typography variant="h6" className={classes.text}>
            {`${course.name} - ${assignment.category} - ${
              assignment.points
            } points`}
          </Typography>
        </Paper>
      );
    } else {
      return null;
    }
  }
}

const styledStudentViewAssignment = withStyles(styles)(StudentViewAssignment);
export default withRouter(
  connect(
    null,
    { createStudentAssignment }
  )(styledStudentViewAssignment)
);
