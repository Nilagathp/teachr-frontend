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
  handleAssign = assignmentId => {
    this.props.assignAssignment(assignmentId);
  };

  handleUnassign = (assignmentId, studentAssignments) => {
    this.props.unassignAssignment(assignmentId, studentAssignments);
  };

  renderGradeButton = (studentAssignments, assignment, teacher) => {
    if (studentAssignments.length > 0) {
      return (
        <>
          <Badge
            badgeContent={`${studentAssignments.length}`}
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
      studentAssignments,
      coursesName,
      students,
      course,
      classes
    } = this.props;
    return (
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
            this.renderGradeButton(studentAssignments, assignment, teacher)
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
    );
  }
}

export default withStyles(styles)(
  connect(
    null,
    { assignAssignment, unassignAssignment }
  )(TeacherAssignmentListItem)
);
