import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

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
    padding: "20px",
    marginLeft: "80%"
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
    let newAnswers = this.state.answers;
    newAnswers[event.target.id] = event.target.value;
    this.setState({
      [name]: newAnswers
    });
  };

  handleSubmit = event => {
    const studentAssignmentId = this.props.studentAssignment.id;
    const answers = this.state.answers;
    this.props.submitStudentAssignment(
      studentAssignmentId,
      answers,
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
            <Button color="primary" onClick={this.handleSubmit}>
              Grade Assignment
            </Button>
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
  const studentId = parseInt(urlArray[7]);
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
