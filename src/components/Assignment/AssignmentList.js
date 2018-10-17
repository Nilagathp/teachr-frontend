import React from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";

const AssignmentList = ({ assignments, courses }) => {
  return (
    <List>
      {assignments.map(assignment => (
        <ListItem
          key={assignment.id}
          divider
          button
          component={Link}
          to={`/course/${assignment.course_id}/assignment/${assignment.id}`}
        >
          <ListItemText
            primary={assignment.name}
            secondary={`
            ${courses[assignment.course_id]} - ${assignment.category}`}
          />
          {/* <p>Student Assignments</p> */}
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
      ))}
    </List>
  );
};

export default AssignmentList;
