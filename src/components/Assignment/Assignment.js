import React from "react";
import { connect } from "react-redux";

import TeacherViewAssignment from "./TeacherViewAssignment";
import StudentViewAssignment from "./StudentViewAssignment";

const Assignment = ({ user, course, assignment }) => {
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
        <StudentViewAssignment
          user={user}
          course={course}
          assignment={assignment}
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
  }
  return {
    user: state.user,
    course: course,
    assignment: assignment
  };
};

export default connect(mapStateToProps)(Assignment);
