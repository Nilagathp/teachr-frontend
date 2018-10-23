import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import isBefore from "date-fns/isBefore";

import { startStudentAssignment } from "../../../redux/actions/studentAssignmentActions";

const renderChip = (studentAssignment, assignment) => {
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
    default:
      return (
        <Chip
          color="secondary"
          label={`${studentAssignment.status.split("_").join(" ")}`}
          variant="outlined"
        />
      );
  }
};

const renderDueDate = dueDate => {
  if (isSameDay(dueDate, new Date())) {
    return (
      <Chip
        label={`${format(dueDate, "M/d @ p")}`}
        variant="outlined"
        color="primary"
      />
    );
  } else if (isBefore(dueDate, new Date())) {
    return (
      <Chip
        label={`${format(dueDate, "M/d @ p")}`}
        variant="outlined"
        color="secondary"
      />
    );
  } else {
    return (
      <Chip
        label={`${format(dueDate, "M/d @ p")}`}
        variant="outlined"
        color="default"
      />
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
        {renderDueDate(assignment.due_date)}
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
