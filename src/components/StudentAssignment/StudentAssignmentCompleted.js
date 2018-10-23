import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

import { shuffle } from "../../functions";
import ViewStudentMultipleChoice from "./ViewStudentAssignmentContent/ViewStudentMultipleChoice";
import ViewStudentShortAnswer from "./ViewStudentAssignmentContent/ViewStudentShortAnswer";
import ViewStudentEssay from "./ViewStudentAssignmentContent/ViewStudentEssay";
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

class StudentAssignmentCompleted extends React.Component {
  render() {
    const { studentAssignment, assignment, course, classes } = this.props;
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
                color="default"
                label={`${studentAssignment.status}`}
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
          <Typography variant="h6" className={classes.text}>
            {`Due on: ${format(assignment.due_date, "PPPP @ p")}`}
          </Typography>
          <Divider />
          <Typography className={classes.content} variant="subtitle1">
            Directions: {assignment.directions}
          </Typography>
          {Object.keys(assignment.content).map(key => {
            const item = assignment.content[key];
            switch (item.type) {
              case "Multiple Choice":
                const shuffledAnswers = shuffle(
                  Object.values(item.content.answers)
                );
                return (
                  <ViewStudentMultipleChoice
                    key={key}
                    id={key}
                    content={item.content}
                    classes={classes}
                    answer={studentAssignment.answers[key]}
                    answerChoices={shuffledAnswers}
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
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(StudentAssignmentCompleted);
