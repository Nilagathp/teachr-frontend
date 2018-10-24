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
import format from "date-fns/format";

import { gradeStudentAssignment } from "../../redux/actions/studentAssignmentActions";
import ViewStudentMultipleChoice from "./ViewStudentAssignmentContent/ViewStudentMultipleChoice";
import ViewStudentShortAnswer from "./ViewStudentAssignmentContent/ViewStudentShortAnswer";
import ViewStudentEssay from "./ViewStudentAssignmentContent/ViewStudentEssay";
import StudentText from "./StudentAssignmentContent/StudentText";

const styles = {
  paper: {
    margin: "20px",
    maxWidth: "95%"
    // display: "flex",
    // flexWrap: "wrap"
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
  chip: {
    marginLeft: "20px"
  },
  group: {
    width: "auto",
    height: "auto",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    marginLeft: "40px"
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

  renderChip = (studentAssignment, assignment) => {
    switch (studentAssignment.status) {
      case "submitted":
        return (
          <Chip
            style={{ marginLeft: "20px" }}
            color="secondary"
            label="submitted"
          />
        );
      case "graded":
        return (
          <Chip
            style={{ marginLeft: "20px" }}
            color="primary"
            label={`graded: ${studentAssignment.points_earned}/${
              assignment.points
            }`}
            variant="outlined"
          />
        );
      case "in_progress":
        return (
          <Chip
            style={{ marginLeft: "20px" }}
            color="secondary"
            label={`${studentAssignment.status.split("_").join(" ")}`}
            variant="outlined"
          />
        );
      default:
        return (
          <Chip
            style={{ marginLeft: "20px" }}
            color="default"
            label={`${studentAssignment.status.split("_").join(" ")}`}
          />
        );
    }
  };

  render() {
    const {
      assignment,
      course,
      studentAssignment,
      student,
      classes
    } = this.props;
    if (assignment && studentAssignment) {
      return (
        <>
          <Typography variant="h4" className={classes.heading}>
            {assignment.name}
            <Button color="primary" onClick={() => this.props.history.goBack()}>
              Back to All Students
            </Button>
            <Button
              color="primary"
              onClick={() => this.props.history.push(`/course/${course.id}`)}
            >
              Back to Course
            </Button>
          </Typography>
          <Typography variant="h6" className={classes.text}>
            {student.name}
            {this.renderChip(studentAssignment, assignment)}
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            {`${course.name} - ${assignment.category} - ${
              assignment.points
            } points`}
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            {`Due: ${format(assignment.due_date, "PPPP @ p")}`}
          </Typography>
          <Divider />
          <Typography className={classes.content} variant="subtitle1">
            Directions: {assignment.directions}
          </Typography>
          {Object.keys(assignment.content).map(key => {
            const item = assignment.content[key];
            switch (item.type) {
              case "Multiple Choice":
                const answerChoices = Object.values(item.content.answers);
                return (
                  <ViewStudentMultipleChoice
                    key={key}
                    id={key}
                    content={item.content}
                    classes={classes}
                    answer={studentAssignment.answers[key]}
                    answerChoices={answerChoices}
                  />
                );
              case "Short Answer":
                return (
                  <ViewStudentShortAnswer
                    key={key}
                    id={key}
                    content={item.content}
                    classes={classes}
                    answer={studentAssignment.answers[key]}
                  />
                );
              case "Essay":
                return (
                  <ViewStudentEssay
                    id={key}
                    key={key}
                    content={item.content}
                    classes={classes}
                    answer={studentAssignment.answers[key]}
                  />
                );
              default:
                return (
                  <StudentText
                    key={key}
                    content={item.content}
                    classes={classes}
                  />
                );
            }
          })}
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
        </>
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
  let student;
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
    studentAssignment = state.user.person.teacher.student_assignments.find(
      studentAssignment =>
        studentAssignment.assignment_id === assignmentId &&
        studentAssignment.student_id === studentId
    );
    student = state.user.person.teacher.students.find(
      student => student.id === studentId
    );
  }
  return {
    assignment: assignment,
    course: course,
    studentAssignment: studentAssignment,
    student: student
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { gradeStudentAssignment }
  )(StudentAssignmentToGrade)
);
