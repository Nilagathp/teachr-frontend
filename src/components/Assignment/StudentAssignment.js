import React from "react";
import { connect } from "react-redux";

import StudentAssignmentWorking from "./StudentAssignmentWorking";

const StudentAssignment = ({ studentAssignment, assignment, course }) => {
  if (studentAssignment) {
    if (
      studentAssignment.status === "not_started" ||
      studentAssignment.status === "in_progress"
    ) {
      return (
        <StudentAssignmentWorking
          studentAssignment={studentAssignment}
          assignment={assignment}
          course={course}
        />
      );
    } else {
      return "render StudentAssignmentCompleted";
    }
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  let assignment;
  let course;
  let studentAssignment;
  if (state.user && state.user.person.student) {
    const assignmentId = parseInt(ownProps.match.url.split("/")[4]);
    const courseId = parseInt(ownProps.match.url.split("/")[2]);
    assignment = state.user.person.student.assignments.find(
      assignment => assignment.id === assignmentId
    );
    course = state.user.person.student.courses.find(
      course => course.id === courseId
    );
    studentAssignment = state.user.person.student.student_assignments.find(
      studentAssignment => studentAssignment.assignment_id === assignmentId
    );
  }
  return {
    assignment: assignment,
    course: course,
    studentAssignment: studentAssignment
  };
};

export default connect(mapStateToProps)(StudentAssignment);
