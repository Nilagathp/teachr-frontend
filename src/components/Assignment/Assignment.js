import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TeacherViewAssignment from "./Teacher/TeacherViewAssignment";
import StudentAssignment from "../StudentAssignment/StudentAssignment";

const Assignment = ({ user, course, assignment, studentAssignment }) => {
  if (user) {
    if (user.role === "teacher") {
      return (
        <TeacherViewAssignment
          user={user}
          course={course}
          assignment={assignment}
        />
      );
    } else {
      return (
        <StudentAssignment
          user={user}
          course={course}
          assignment={assignment}
          studentAssignment={studentAssignment}
        />
      );
    }
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  let assignment;
  let course;
  let studentAssignment;
  const assignmentId = parseInt(ownProps.match.params.id);
  const courseId = parseInt(ownProps.match.url.split("/")[2]);
  if (state.user && state.user.person.teacher) {
    assignment = state.user.person.teacher.assignments.find(
      assignment =>
        assignment.id === assignmentId && assignment.course_id === courseId
    );
    course = state.user.person.teacher.courses.find(
      course => course.id === courseId
    );
  }
  if (state.user && state.user.person.student) {
    assignment = state.user.person.student.assignments.find(
      assignment =>
        assignment.id === assignmentId && assignment.course_id === courseId
    );
    course = state.user.person.student.courses.find(
      course => course.id === courseId
    );
    studentAssignment = state.user.person.student.student_assignments.find(
      student_assignment => assignmentId === student_assignment.assignment_id
    );
  }
  return {
    user: state.user,
    course: course,
    assignment: assignment,
    studentAssignment: studentAssignment
  };
};

export default withRouter(connect(mapStateToProps)(Assignment));
