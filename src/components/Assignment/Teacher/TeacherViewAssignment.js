import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { deleteAssignment } from "../../../redux/actions/assignmentActions";
import MultipleChoice from "./AssignmentContent/MultipleChoice";
import ShortAnswerOrEssay from "./AssignmentContent/ShortAnswerOrEssay";
import Text from "./AssignmentContent/Text";

const styles = {
  paper: {
    margin: "20px",
    paddingBottom: "10px"
  },
  card: {
    margin: "20px",
    padding: "5px"
  },
  heading: {
    marginLeft: "20px",
    marginTop: "20px",
    paddingTop: "20px"
  },
  button: {
    paddingLeft: "20px"
  },
  headingText: {
    marginLeft: "20px",
    paddingBottom: "10px"
  },
  text: {
    marginLeft: "20px"
  }
};

class TeacherViewAssignment extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { course, assignment, classes } = this.props;
    if (assignment) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h4" className={classes.heading}>
            {assignment.name}
            <Button
              className={classes.button}
              color="primary"
              component={Link}
              to={`/course/${course.id}/assignment/${assignment.id}/grade`}
            >
              Grade
            </Button>
            <Button
              className={classes.button}
              color="primary"
              component={Link}
              to={`/course/${course.id}/assignment/${assignment.id}/edit`}
            >
              Edit
            </Button>
            <Button
              className={classes.button}
              color="primary"
              onClick={this.handleClickOpen}
            >
              Delete
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>{"Delete this assignment?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  The assignment will be permanently deleted.
                </DialogContentText>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      this.props.deleteAssignment(
                        assignment.id,
                        this.props.history.push
                      )
                    }
                    color="primary"
                  >
                    Delete
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </Typography>
          <Typography variant="h6" className={classes.headingText}>
            {`${course.name} - ${assignment.category} - ${
              assignment.points
            } points`}
          </Typography>
          <Typography className={classes.text} variant="subtitle1">
            Directions: {assignment.directions}
          </Typography>
          {Object.keys(assignment.content).map(key => {
            const item = assignment.content[key];
            if (item.type === "Multiple Choice") {
              return (
                <MultipleChoice
                  key={key}
                  content={item.content}
                  classes={classes}
                />
              );
            } else if (item.type === "Text") {
              return (
                <Text key={key} content={item.content} classes={classes} />
              );
            } else {
              return (
                <ShortAnswerOrEssay
                  key={key}
                  type={item.type}
                  content={item.content}
                  classes={classes}
                />
              );
            }
          })}
        </Paper>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(
  connect(
    null,
    { deleteAssignment }
  )(TeacherViewAssignment)
);