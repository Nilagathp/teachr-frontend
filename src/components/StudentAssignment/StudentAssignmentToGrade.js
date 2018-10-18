import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";

import { gradeStudentAssignment } from "../../redux/actions/assignmentActions";

const styles = {
  paper: {
    margin: "20px",
    maxWidth: "95%",
    display: "flex",
    flexWrap: "wrap"
  },
  heading: {
    marginLeft: "20px",
    paddingTop: "20px"
  },
  button: {
    marginLeft: "80%",
    paddingRight: "20px"
  },
  points: {
    marginLeft: "80%",
    paddingRight: "20px"
  },
  textField: {
    marginLeft: "20px",
    marginRight: "20px",
    marginBottom: "10px",
    maxWidth: "95%"
  },
  text: {
    marginLeft: "20px",
    paddingBottom: "10px"
  },
  content: {
    marginLeft: "20px",
    paddingBottom: "10px",
    paddingTop: "10px"
  },
  question: {
    marginLeft: "20px"
  }
};

class StudentAssignmentToGrade extends React.Component {
  state = {
    points: 0
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = event => {
    const studentAssignmentId = this.props.studentAssignment.id;
    const points = this.state.points;
    this.props.gradeStudentAssignment(
      studentAssignmentId,
      points,
      this.props.course.id,
      this.props.history.push
    );
  };

  render() {
    const { assignment, course, studentAssignment, classes } = this.props;
    if (assignment && studentAssignment) {
      return (
        <Paper className={classes.paper}>
          <div>
            <Typography variant="h4" className={classes.heading}>
              {assignment.name}
              {studentAssignment.status === "graded" ? (
                <Chip
                  color="primary"
                  label={`graded: ${studentAssignment.points_earned}/${
                    assignment.points
                  }`}
                  className={classes.question}
                  variant="outlined"
                />
              ) : (
                <Chip
                  color="primary"
                  label={`${studentAssignment.status.split("_").join(" ")}`}
                  className={classes.question}
                  variant="outlined"
                />
              )}
            </Typography>
            <Typography variant="h6" className={classes.text}>
              {`${course.name} - ${assignment.category} - ${
                assignment.points
              } points`}
            </Typography>
          </div>
          <div>
            <Typography className={classes.content} variant="subtitle1">
              Directions: {assignment.directions}
            </Typography>
            <Divider />
            <Typography className={classes.content}>
              {assignment.content}
            </Typography>
            <Typography variant="subtitle1" className={classes.text}>
              Questions:
            </Typography>
            {assignment.questions.map((question, index) => (
              <React.Fragment key={index}>
                <Typography
                  key={`question-${index}`}
                  className={classes.question}
                >
                  {`${index + 1}. ${question}`}{" "}
                </Typography>
                <TextField
                  id={`${index}`}
                  multiline
                  fullWidth
                  variant="outlined"
                  key={`answer-${index}`}
                  className={classes.textField}
                  defaultValue={studentAssignment.answers[index]}
                  InputProps={{ readOnly: true }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </React.Fragment>
            ))}
            {studentAssignment.status === "submitted" ? (
              <React.Fragment>
                <InputLabel shrink className={classes.points}>{`Points out of ${
                  assignment.points
                }`}</InputLabel>
                <TextField
                  value={this.state.points}
                  onChange={this.handleChange("points")}
                  type="number"
                  className={classes.points}
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 10
                    }
                  }}
                  margin="normal"
                />
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.handleSubmit}
                >
                  Submit Grade
                </Button>
              </React.Fragment>
            ) : null}
          </div>
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
  let studentAssignment;
  const urlArray = ownProps.match.url.split("/");
  const assignmentId = parseInt(urlArray[4]);
  const courseId = parseInt(urlArray[2]);
  // const studentId = parseInt(urlArray[7]);
  if (state.user && state.user.person.teacher) {
    assignment = state.user.person.teacher.assignments.find(
      assignment => assignment.id === assignmentId
    );
    course = state.user.person.teacher.courses.find(
      course => course.id === courseId
    );
  }
  if (state.students) {
    studentAssignment = state.students
      .map(student => student.student_assignments)
      .flat()
      .find(
        studentAssignment => studentAssignment.assignment_id === assignmentId
      );
  }
  return {
    assignment: assignment,
    course: course,
    studentAssignment: studentAssignment
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { gradeStudentAssignment }
  )(StudentAssignmentToGrade)
);
