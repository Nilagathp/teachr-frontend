import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import isBefore from "date-fns/isBefore";

import { startStudentAssignment } from "../../../redux/actions/studentAssignmentActions";

const renderChip = (studentAssignment, assignment) => {
  if (studentAssignment) {
    switch (studentAssignment.status) {
      case "submitted":
        return <Chip color="default" label="submitted" variant="outlined" />;
      case "graded":
        return (
          <Chip
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
            color="secondary"
            label={`${studentAssignment.status.split("_").join(" ")}`}
            variant="outlined"
          />
        );
      default:
        return (
          <Chip
            color="secondary"
            label={`${studentAssignment.status.split("_").join(" ")}`}
          />
        );
    }
  }
};

const renderDueDate = assignment => {
  if (isBefore(assignment.due_date, new Date())) {
    return (
      <Button variant="outlined" color="secondary">{`due ${format(
        assignment.due_date,
        "M/d @ p"
      )}`}</Button>
    );
  } else if (isSameDay(assignment.due_date, new Date())) {
    return (
      <Button variant="contained" color="secondary">{`due ${format(
        assignment.due_date,
        "M/d @ p"
      )}`}</Button>
    );
  } else {
    return (
      <Button variant="outlined" color="default">{`due ${format(
        assignment.due_date,
        "M/d @ p"
      )}`}</Button>
    );
  }
};

class StudentAssignmentListItem extends React.Component {
  render() {
    const { assignment, studentAssignment, coursesName } = this.props;
    return (
      <ListItem
        key={assignment.id}
        divider
        button
        onClick={() =>
          this.props.history.push(
            `/course/${assignment.course_id}/assignment/${assignment.id}`
          )
        }
      >
        {renderDueDate(assignment)}
        {coursesName ? (
          <ListItemText
            primary={`${assignment.name}`}
            secondary={`${coursesName[assignment.course_id]} - ${
              assignment.category
            } - ${assignment.points} points`}
          />
        ) : (
          <ListItemText
            primary={`${assignment.name}`}
            secondary={`${assignment.category} - ${assignment.points} points`}
          />
        )}
        {renderChip(studentAssignment, assignment)}
      </ListItem>
    );
  }
}

export default withRouter(
  connect(
    null,
    { startStudentAssignment }
  )(StudentAssignmentListItem)
);
