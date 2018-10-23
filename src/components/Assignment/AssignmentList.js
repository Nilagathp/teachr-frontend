import React from "react";

import List from "@material-ui/core/List";

import TeacherAssignmentListItem from "./Teacher/TeacherAssignmentListItem";
import StudentAssignmentListItem from "./Student/StudentAssignmentListItem";

const AssignmentList = ({
  teacher,
  assignments,
  studentAssignments,
  coursesName,
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
            coursesName={coursesName}
            students={teacher.students}
            studentAssignments={studentAssignments.filter(
              studentAssignment =>
                studentAssignment.assignment_id === assignment.id &&
                studentAssignment.status === "submitted"
            )}
            course={courses.find(course => course.id === assignment.course_id)}
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
            coursesName={coursesName}
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
