import React from "react";
import { Link } from "react-router-dom";

import List from "@material-ui/core/List";

import TeacherAssignmentListItem from "./TeacherAssignmentListItem";

const AssignmentList = ({ teacher, assignments, courses }) => {
  if (teacher) {
    return (
      <List>
        {assignments.map(assignment => (
          <TeacherAssignmentListItem
            key={assignment.id}
            assignment={assignment}
            teacher={teacher}
            courses={courses}
          />
        ))}
      </List>
    );
  }
};

export default AssignmentList;
