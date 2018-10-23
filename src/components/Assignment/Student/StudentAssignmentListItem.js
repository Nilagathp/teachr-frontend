import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import format from "date-fns/format";

import { startStudentAssignment } from "../../../redux/actions/studentAssignmentActions";

const renderChip = (studentAssignment, assignment) => {
  switch (studentAssignment.status) {
    case "submitted":
      return <Chip color="primary" label="submitted" variant="outlined" />;
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

class StudentAssignmentListItem extends React.Component {
  handleClick = (studentAssignment, courseId, push) => {
    if (studentAssignment.status === "not_started") {
      this.props.startStudentAssignment(studentAssignment.id, courseId, push);
    } else {
      this.props.history.push(
        `/course/${courseId}/assignment/${studentAssignment.assignment_id}`
      );
    }
  };

  render() {
    const { teacher, assignment, studentAssignment, coursesName } = this.props;
    return (
      <ListItem
        key={assignment.id}
        divider
        button
        onClick={() =>
          this.handleClick(
            studentAssignment,
            assignment.course_id,
            this.props.history.push
          )
        }
      >
        {coursesName ? (
          <ListItemText
            primary={`${assignment.name} - due ${format(
              assignment.due_date,
              "M/d @ p"
            )}`}
            secondary={`${coursesName[assignment.course_id]} - ${
              assignment.category
            } - ${assignment.points} points`}
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
        {studentAssignment ? (
          renderChip(studentAssignment, assignment)
        ) : (
          <Chip color="secondary" label="not started" variant="outlined" />
        )}
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
