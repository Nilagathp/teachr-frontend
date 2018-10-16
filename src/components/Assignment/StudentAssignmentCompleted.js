import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

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
                label={`grade: ${studentAssignment.points_earned}/${
                  assignment.points
                }`}
                className={classes.question}
                variant="outlined"
              />
            ) : (
              <Chip
                color="primary"
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
                value={`${studentAssignment.answers[index]}`}
                variant="outlined"
                key={`answer-${index}`}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  readOnly: true
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(StudentAssignmentCompleted);
