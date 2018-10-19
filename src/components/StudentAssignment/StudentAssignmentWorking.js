import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

import { submitStudentAssignment } from "../../redux/actions/studentAssignmentActions";
import { saveStudentAssignment } from "../../redux/actions/studentAssignmentActions";
import EditStudentMultipleChoice from "./EditStudentAssignmentContent/EditStudentMultipleChoice";
import EditStudentShortAnswer from "./EditStudentAssignmentContent/EditStudentShortAnswer";
import EditStudentEssay from "./EditStudentAssignmentContent/EditStudentEssay";
import StudentText from "./StudentAssignmentContent/StudentText";

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
    padding: "20px"
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

class StudentAssignmentWorking extends React.Component {
  state = {
    answers: {}
  };

  handleChange = name => event => {
    let newAnswers = this.state.answers;
    newAnswers[event.target.id] = event.target.value;
    this.setState({
      [name]: newAnswers
    });
  };

  handleSave = event => {
    const studentAssignmentId = this.props.studentAssignment.id;
    const answers = this.state.answers;
    this.props.saveStudentAssignment(
      studentAssignmentId,
      answers,
      this.props.course.id,
      this.props.history.push
    );
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
    const { studentAssignment, assignment, course, classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <div>
          <Typography variant="h4" className={classes.heading}>
            {assignment.name}
            <Chip
              color="primary"
              label={`${studentAssignment.status.split("_").join(" ")}`}
              className={classes.question}
              variant="outlined"
            />
          </Typography>
          <Typography variant="h6" className={classes.text}>
            {`${course.name} - ${assignment.category} - ${
              assignment.points
            } points`}
          </Typography>
          <Divider />
          <Typography className={classes.content} variant="subtitle1">
            Directions: {assignment.directions}
          </Typography>
          {Object.keys(assignment.content).map(key => {
            const item = assignment.content[key];
            switch (item.type) {
              case "Multiple Choice":
                return (
                  <EditStudentMultipleChoice
                    key={key}
                    id={key}
                    content={item.content}
                    classes={classes}
                  />
                );
              case "Short Answer":
                return (
                  <EditStudentShortAnswer
                    key={key}
                    id={key}
                    content={item.content}
                    classes={classes}
                    handleChange={this.handleChange("answers")}
                  />
                );
              case "Essay":
                return (
                  <EditStudentEssay
                    id={key}
                    key={key}
                    type={item.type}
                    content={item.content}
                    classes={classes}
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
          {/* {assignment.questions.map((question, index) => (
            <React.Fragment key={index}>
              <Typography
                key={`question-${index}`}
                className={classes.question}
              >
                {`${index + 1}. ${question}`}{" "}
              </Typography>
              {this.state.answers[index] ? (
                <TextField
                  id={`${index}`}
                  multiline
                  fullWidth
                  value={`${this.state.answers[index]}`}
                  variant="outlined"
                  key={`answer-${index}`}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={this.handleChange("answers")}
                />
              ) : (
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
              )}
            </React.Fragment>
          ))} */}
          <Button
            color="primary"
            className={classes.button}
            onClick={this.handleSave}
          >
            Save and Finish Later
          </Button>
          <Button
            color="primary"
            className={classes.button}
            onClick={this.handleSubmit}
          >
            Submit Assignment
          </Button>
        </div>
      </Paper>
    );
  }
}

const styledStudentAssignmentWorking = withStyles(styles)(
  StudentAssignmentWorking
);
export default withRouter(
  connect(
    null,
    { saveStudentAssignment, submitStudentAssignment }
  )(styledStudentAssignmentWorking)
);
