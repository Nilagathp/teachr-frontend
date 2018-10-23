import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import format from "date-fns/format";

import { assignAssignment } from "../../../redux/actions/assignmentActions";
import { unassignAssignment } from "../../../redux/actions/assignmentActions";

const styles = theme => ({
  lightTooltip: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 14
  }
});

class TeacherAssignmentListItem extends React.Component {
  state = {
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

  renderGradeButton = (submittedStudentAssignments, assignment, teacher) => {
    if (submittedStudentAssignments.length > 0) {
      return (
        <>
          <Badge
            badgeContent={`${submittedStudentAssignments.length}`}
            color="secondary"
            style={{ margin: "20px" }}
          >
            <Button
              color="primary"
              variant="outlined"
              size="small"
              component={Link}
              to={`/course/${assignment.course_id}/assignment/${
                assignment.id
              }/grade`}
            >
              Grade
            </Button>
          </Badge>
          <Switch
            onChange={() =>
              this.handleUnassign(assignment.id, teacher.student_assignments)
            }
            color="primary"
            checked={true}
          />
        </>
      );
    } else {
      return (
        <>
          <Button
            color="primary"
            variant="outlined"
            size="small"
            style={{ margin: "20px" }}
            component={Link}
            to={`/course/${assignment.course_id}/assignment/${
              assignment.id
            }/grade`}
          >
            Grade
          </Button>
          <Switch
            onChange={() =>
              this.handleUnassign(assignment.id, teacher.student_assignments)
            }
            color="primary"
            checked={true}
          />
        </>
      );
    }
  };

  render() {
    const {
      teacher,
      assignment,
      allStudentAssignments,
      submittedStudentAssignments,
      coursesName,
      students,
      course,
      classes
    } = this.props;
    return (
      <>
        <ListItem
          key={assignment.id}
          divider
          button
          component={Link}
          to={`/course/${assignment.course_id}/assignment/${assignment.id}`}
        >
          {coursesName ? (
            <ListItemText
              primary={`${assignment.name} - due ${format(
                assignment.due_date,
                "M/d @ p"
              )}`}
              secondary={`
              ${coursesName[assignment.course_id]} - ${assignment.category}`}
            />
          ) : (
            <ListItemText
              primary={`${assignment.name} - due ${format(
                assignment.due_date,
                "M/d @ p"
              )}`}
              secondary={`${assignment.category} - ${assignment.points} points`}
            />
          )}
          <ListItemSecondaryAction>
            {assignment.assigned ? (
              this.renderGradeButton(
                submittedStudentAssignments,
                assignment,
                teacher
              )
            ) : (
              <Tooltip
                title="Assign"
                placement="left"
                classes={{ tooltip: classes.lightTooltip }}
              >
                <Switch onChange={() => this.handleAssign(assignment.id)} />
              </Tooltip>
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <Dialog open={this.state.openWithWarning} onClose={this.handleClose}>
          <DialogContent>
            <DialogTitle>Unassign?</DialogTitle>
            <DialogContentText>
              Some students have already started working on this assignment and
              their progress will be lost.
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
      </>
    );
  }
}

export default withStyles(styles)(
  connect(
    null,
    { assignAssignment, unassignAssignment }
  )(TeacherAssignmentListItem)
);
