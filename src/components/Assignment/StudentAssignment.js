import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { submitStudentAssignment } from "../../redux/actions/assignmentActions";

const styles = {
  paper: {
    margin: "20px",
    maxWidth: "95%",
    display: "flex",
    flexWrap: "wrap"
  },
  heading: {
    padding: "20px"
  },
  button: {
    padding: "20px",
    marginLeft: "80%"
  },
  textField: {
    marginLeft: "20px",
    marginTop: "20px",
    marginRight: "20px",
    maxWidth: "93%"
  }
};

const categories = [
  {
    value: 0,
    label: "CW"
  },
  {
    value: 1,
    label: "HW"
  },
  {
    value: 2,
    label: "TQP"
  }
];

class StudentAssignment extends React.Component {
  render() {
    const { assignment, course, classes } = this.props;
    if (assignment) {
      return (
        <Paper className={classes.paper}>
          <div>
            <Typography variant="h4" className={classes.heading}>
              {assignment.name}
              <Typography variant="h6" className={classes.text}>
                {`${course.name} - ${assignment.category} - ${
                  assignment.points
                } points`}
              </Typography>
            </Typography>
          </div>
          <Typography className={classes.heading} variant="subtitle1">
            Directions: {assignment.directions}
          </Typography>
          <Typography className={classes.heading}>
            {assignment.content}
          </Typography>
          <Typography variant="subtitle1" className={classes.heading}>
            Questions:
            {assignment.questions.map((question, index) => (
              <Typography key={index} className={classes.text}>
                {`${index + 1}. ${question}`}
              </Typography>
            ))}
          </Typography>
        </Paper>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let assignment;
  let course;
  if (state.user && state.user.person.student) {
    const assignmentId = parseInt(ownProps.match.url.split("/")[4]);
    const courseId = parseInt(ownProps.match.url.split("/")[2]);
    assignment = state.user.person.student.assignments.find(
      assignment => assignment.id === assignmentId
    );
    course = state.user.person.student.courses.find(
      course => course.id === courseId
    );
  }
  return {
    assignment: assignment,
    course: course
  };
};

const styledStudentAssignment = withStyles(styles)(StudentAssignment);
export default withRouter(
  connect(
    mapStateToProps,
    { submitStudentAssignment }
  )(styledStudentAssignment)
);
