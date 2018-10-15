import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
// import MenuItem from "@material-ui/core/MenuItem";

import { submitStudentAssignment } from "../../redux/actions/assignmentActions";

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

class StudentAssignment extends React.Component {
  state = {
    answers: []
  };

  handleChange = name => event => {
    let newAnswers = this.state.answers;
    newAnswers[event.target.id] = event.target.value;
    this.setState({
      [name]: newAnswers
    });
  };

  handleSubmit = event => {
    console.log("submit");
    console.log(this.state.answers);
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
    const { assignment, course, classes } = this.props;
    if (assignment) {
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
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("answers")}
                />
              </React.Fragment>
            ))}
            <Button color="primary" onClick={this.handleSubmit}>
              Submit Assignment
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
  if (state.user && state.user.person.student) {
    const assignmentId = parseInt(ownProps.match.url.split("/")[4]);
    const courseId = parseInt(ownProps.match.url.split("/")[2]);
    assignment = state.user.person.student.assignments.find(
      assignment => assignment.id === assignmentId
    );
    course = state.user.person.student.courses.find(
      course => course.id === courseId
    );
    studentAssignment = state.user.person.student.student_assignments.find(
      studentAssignment => studentAssignment.assignment_id === assignmentId
    );
  }
  return {
    assignment: assignment,
    course: course,
    studentAssignment: studentAssignment
  };
};

const styledStudentAssignment = withStyles(styles)(StudentAssignment);
export default withRouter(
  connect(
    mapStateToProps,
    { submitStudentAssignment }
  )(styledStudentAssignment)
);
