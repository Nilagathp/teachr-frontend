import React from "react";

import List from "@material-ui/core/List";

import TeacherAssignmentListItem from "./Teacher/TeacherAssignmentListItem";
import StudentAssignmentListItem from "./Student/StudentAssignmentListItem";

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
  } else {
    return (
      <List>
        {assignments.map(assignment => (
          <StudentAssignmentListItem
            key={assignment.id}
            assignment={assignment}
            courses={courses}
          />
        ))}
      </List>
    );
  }
};

export default AssignmentList;
