import React from "react";
import { Link, withRouter } from "react-router-dom";
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
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import format from "date-fns/format";

import {
  deleteAssignment,
  assignAssignment,
  unassignAssignment
} from "../../../redux/actions/assignmentActions";
import MultipleChoice from "./AssignmentContent/MultipleChoice";
import ShortAnswerOrEssay from "./AssignmentContent/ShortAnswerOrEssay";
import Text from "./AssignmentContent/Text";

const styles = theme => ({
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
    marginLeft: "20px"
  },
  headingText: {
    marginLeft: "20px",
    paddingBottom: "10px"
  },
  text: {
    marginLeft: "20px"
  },
  lightTooltip: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 14
  },
  switch: {
    marginRight: "80px"
  }
});

class TeacherViewAssignment extends React.Component {
  state = {
    openDelete: false,
    open: false,
    openWithWarning: false
  };

  handleAssign = assignmentId => {
    this.props.assignAssignment(assignmentId);
  };

  handleUnassign = (assignmentId, allStudentAssignments) => {
    const studentAssignmentsStarted = allStudentAssignments.filter(
      studentAssignment =>
        studentAssignment.assignment_id === assignmentId &&
        studentAssignment.status !== "not_started"
    );
    if (studentAssignmentsStarted.length > 0) {
      this.setState({ openWithWarning: true });
    } else {
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({ openWithWarning: false, open: false });
  };

  unassign = (assignmentId, allStudentAssignments) => {
    this.props.unassignAssignment(assignmentId, allStudentAssignments);
    this.handleClose();
  };

  handleOpenDelete = () => {
    this.setState({ openDelete: true });
  };

  handleCloseDelete = () => {
    this.setState({ openDelete: false });
  };

  renderGradeButton = (submittedStudentAssignments, assignment, teacher) => {
    if (submittedStudentAssignments.length > 0) {
      return (
        <>
          <Switch
            onChange={() =>
              this.handleUnassign(assignment.id, teacher.student_assignments)
            }
            color="primary"
            checked={true}
          />
          <Badge
            badgeContent={`${submittedStudentAssignments.length}`}
            color="secondary"
            style={{ margin: "20px" }}
          >
            <Button
              color="primary"
              variant="outlined"
              component={Link}
              to={`/course/${assignment.course_id}/assignment/${
                assignment.id
              }/grade`}
            >
              Grade
            </Button>
          </Badge>
        </>
      );
    } else {
      return (
        <>
          <Switch
            onChange={() =>
              this.handleUnassign(assignment.id, teacher.student_assignments)
            }
            color="primary"
            checked={true}
          />
          <Button
            color="primary"
            variant="outlined"
            component={Link}
            to={`/course/${assignment.course_id}/assignment/${
              assignment.id
            }/grade`}
          >
            Grade
          </Button>
        </>
      );
    }
  };

  render() {
    const {
      user,
      submittedStudentAssignments,
      allStudentAssignments,
      course,
      assignment,
      classes
    } = this.props;
    if (assignment) {
      return (
        <Paper className={classes.paper}>
          <Dialog open={this.state.openWithWarning} onClose={this.handleClose}>
            <DialogContent>
              <DialogTitle>Unassign?</DialogTitle>
              <DialogContentText>
                Some students have already started working on this assignment
                and their progress will be lost.
              </DialogContentText>
              <DialogActions>
                <Button color="secondary" onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={() =>
                    this.unassign(assignment.id, allStudentAssignments)
                  }
                >
                  Unassign
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogContent>
              <DialogTitle>Unassign?</DialogTitle>
              <DialogContentText>
                Students will not be able to view or begin working on this
                assignment.
              </DialogContentText>
              <DialogActions>
                <Button color="secondary" onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={() =>
                    this.unassign(assignment.id, allStudentAssignments)
                  }
                >
                  Unassign
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
          <Typography variant="h4" className={classes.heading}>
            {assignment.name}
            <Button
              color="primary"
              onClick={() => this.props.history.push(`/course/${course.id}`)}
            >
              View Course
            </Button>
            {assignment.assigned ? (
              this.renderGradeButton(
                submittedStudentAssignments,
                assignment,
                user.person.teacher
              )
            ) : (
              <Tooltip
                title="Assign"
                placement="right"
                classes={{ tooltip: classes.lightTooltip }}
              >
                <Switch
                  className={classes.switch}
                  onChange={() => this.handleAssign(assignment.id)}
                />
              </Tooltip>
            )}
            <Button
              className={classes.button}
              color="primary"
              variant="outlined"
              component={Link}
              to={`/course/${course.id}/assignment/${assignment.id}/edit`}
            >
              Edit
            </Button>
            <Button
              className={classes.button}
              color="primary"
              variant="outlined"
              onClick={this.handleOpenDelete}
            >
              Delete
            </Button>
            <Dialog
              open={this.state.openDelete}
              onClose={this.handleCloseDelete}
            >
              <DialogTitle>{"Delete this assignment?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  The assignment will be permanently deleted.
                </DialogContentText>
                <DialogActions>
                  <Button onClick={this.handleCloseDelete} color="primary">
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
          <Typography variant="h6" className={classes.headingText}>
            {`Due on: ${format(assignment.due_date, "PPPP @ p")}`}
          </Typography>
          <Divider />
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

const mapStateToProps = (state, ownProps) => {
  const teacher = ownProps.user.person.teacher;
  const assignment = ownProps.assignment;
  let submittedStudentAssignments;
  if (assignment) {
    submittedStudentAssignments = teacher.student_assignments.filter(
      studentAssignment =>
        studentAssignment.assignment_id === assignment.id &&
        studentAssignment.status === "submitted"
    );
  }
  return {
    submittedStudentAssignments: submittedStudentAssignments,
    allStudentAssignments: teacher.student_assignments
  };
};

const StyledTeacherViewAssignment = withStyles(styles)(TeacherViewAssignment);
export default withRouter(
  connect(
    mapStateToProps,
    { assignAssignment, unassignAssignment, deleteAssignment }
  )(StyledTeacherViewAssignment)
);
