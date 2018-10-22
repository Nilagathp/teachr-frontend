import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import format from "date-fns/format";

import { assignAssignment } from "../../../redux/actions/assignmentActions";
import { unassignAssignment } from "../../../redux/actions/assignmentActions";

class TeacherAssignmentListItem extends React.Component {
  handleAssign = assignmentId => {
    this.props.assignAssignment(assignmentId);
  };

  handleUnassign = (assignmentId, studentAssignments) => {
    this.props.unassignAssignment(assignmentId, studentAssignments);
  };

  render() {
    const {
      teacher,
      assignment,
      studentAssignments,
      coursesName,
      students,
      course
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
            primary={assignment.name}
            secondary={`
              ${coursesName[assignment.course_id]} - ${
              assignment.category
            } - ${format(assignment.due_date, "M/d")}`}
          />
        ) : (
          <ListItemText
            primary={assignment.name}
            secondary={`${assignment.category} - ${
              assignment.points
            } points - ${format(assignment.due_date, "M/d")}`}
          />
        )}
        <ListItemSecondaryAction>
          {assignment.assigned ? (
            <Switch
              onChange={() =>
                this.handleUnassign(assignment.id, teacher.student_assignments)
              }
              checked={true}
            />
          ) : (
            <Switch onChange={() => this.handleAssign(assignment.id)} />
          )}
          {studentAssignments.length > 0 ? (
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
          ) : (
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
          )}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default connect(
  null,
  { assignAssignment, unassignAssignment }
)(TeacherAssignmentListItem);
