import React from "react";

import List from "@material-ui/core/List";

import TeacherAssignmentListItem from "./Teacher/TeacherAssignmentListItem";
import StudentAssignmentListItem from "./Student/StudentAssignmentListItem";

const AssignmentList = ({
  teacher,
  assignments,
  studentAssignments,
  courses
}) => {
  if (teacher) {
    return (
      <List>
        {assignments.map(assignment => (
          <TeacherAssignmentListItem
            key={assignment.id}
            assignment={assignment}
            teacher={teacher}
            courses={courses}
            studentAssignments={studentAssignments.filter(
              studentAssignment =>
                studentAssignment.assignment_id === assignment.id &&
                studentAssignment.status === "submitted"
            )}
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
            studentAssignment={studentAssignments.find(
              studentAssignment =>
                studentAssignment.assignment_id === assignment.id
            )}
          />
        ))}
      </List>
    );
  }
};

export default AssignmentList;
