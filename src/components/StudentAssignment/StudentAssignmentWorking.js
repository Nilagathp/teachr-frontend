import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

import { shuffle } from "../../functions";
import { submitStudentAssignment } from "../../redux/actions/studentAssignmentActions";
import { saveStudentAssignment } from "../../redux/actions/studentAssignmentActions";
import EditStudentMultipleChoice from "./EditStudentAssignmentContent/EditStudentMultipleChoice";
import EditStudentShortAnswer from "./EditStudentAssignmentContent/EditStudentShortAnswer";
import EditStudentEssay from "./EditStudentAssignmentContent/EditStudentEssay";
import StudentText from "./StudentAssignmentContent/StudentText";
import format from "date-fns/format";

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

class StudentAssignmentWorking extends React.PureComponent {
  state = {};

  static getDerivedStateFromProps(props, state) {
    if (
      props.studentAssignment !== null &&
      props.studentAssignment.id !== state.studentAssignmentId
    ) {
      return {
        answers: props.studentAssignment.answers,
        studentAssignmentId: props.studentAssignment.id
      };
    } else {
      return null;
    }
  }

  handleChange = name => event => {
    let newAnswers;
    if (this.state.answers) {
      newAnswers = this.state.answers;
    } else {
      newAnswers = {};
    }
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
    event.preventDefault();
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
      <div>
        <Typography variant="h4" className={classes.heading}>
          {assignment.name}
          <Chip
            color="secondary"
            label="in progress"
            className={classes.question}
            variant="outlined"
          />
          <Button color="primary" onClick={this.props.history.goBack}>
            Back
          </Button>
        </Typography>
        <Typography variant="h6" className={classes.text}>
          {`${course.name} - ${assignment.category} - ${
            assignment.points
          } points`}
        </Typography>
        <Typography variant="h6" className={classes.text}>
          {`Due on: ${format(assignment.due_date, "PPPP @ p")}`}
        </Typography>
        <Divider />
        <Typography className={classes.content} variant="subtitle1">
          Directions: {assignment.directions}
        </Typography>
        <form onSubmit={this.handleSubmit}>
          {Object.keys(assignment.content).map(key => {
            const item = assignment.content[key];
            switch (item.type) {
              case "Multiple Choice":
                const shuffledAnswers = [
                  Object.values(item.content.answers)[3],
                  Object.values(item.content.answers)[1],
                  Object.values(item.content.answers)[0],
                  Object.values(item.content.answers)[2]
                ];
                if (this.state.answers && this.state.answers[key]) {
                  return (
                    <EditStudentMultipleChoice
                      key={key}
                      id={key}
                      content={item.content}
                      classes={classes}
                      answerChoices={shuffledAnswers}
                      handleChange={this.handleChange("answers")}
                      answer={this.state.answers[key]}
                    />
                  );
                } else {
                  return (
                    <EditStudentMultipleChoice
                      key={key}
                      id={key}
                      content={item.content}
                      classes={classes}
                      answerChoices={shuffledAnswers}
                      handleChange={this.handleChange("answers")}
                    />
                  );
                }
              case "Short Answer":
                if (this.state.answers && this.state.answers[key]) {
                  return (
                    <EditStudentShortAnswer
                      key={key}
                      id={key}
                      content={item.content}
                      classes={classes}
                      handleChange={this.handleChange("answers")}
                      answer={this.state.answers[key]}
                    />
                  );
                } else {
                  return (
                    <EditStudentShortAnswer
                      key={key}
                      id={key}
                      content={item.content}
                      classes={classes}
                      handleChange={this.handleChange("answers")}
                    />
                  );
                }
              case "Essay":
                if (this.state.answers && this.state.answers[key]) {
                  return (
                    <EditStudentEssay
                      id={key}
                      key={key}
                      content={item.content}
                      classes={classes}
                      handleChange={this.handleChange("answers")}
                      answer={this.state.answers[key]}
                    />
                  );
                } else {
                  return (
                    <EditStudentEssay
                      id={key}
                      key={key}
                      content={item.content}
                      classes={classes}
                      handleChange={this.handleChange("answers")}
                    />
                  );
                }
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
          <Button
            color="primary"
            className={classes.button}
            onClick={this.handleSave}
          >
            Save and Finish Later
          </Button>
          <Button color="primary" className={classes.button} type="submit">
            Submit Assignment
          </Button>
        </form>
      </div>
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
