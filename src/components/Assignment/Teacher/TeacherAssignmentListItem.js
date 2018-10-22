import React from "react";
import { Link } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import format from "date-fns/format";

const TeacherAssignmentListItem = ({
  teacher,
  assignment,
  studentAssignments,
  courses
}) => {
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
};

export default TeacherAssignmentListItem;
