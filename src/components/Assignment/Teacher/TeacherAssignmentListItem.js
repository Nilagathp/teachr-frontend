import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import format from "date-fns/format";

const TeacherAssignmentListItem = ({ teacher, assignment, courses }) => {
  return (
    <ListItem
      key={assignment.id}
      divider
      button
      component={Link}
      to={`/course/${assignment.course_id}/assignment/${assignment.id}`}
    >
      {courses ? (
        <ListItemText
          primary={assignment.name}
          secondary={`
              ${courses[assignment.course_id]} - ${
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
        <Button
          color="primary"
          component={Link}
          to={`/course/${assignment.course_id}/assignment/${
            assignment.id
          }/grade`}
        >
          Grade
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TeacherAssignmentListItem;
