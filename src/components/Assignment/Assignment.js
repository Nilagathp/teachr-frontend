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
      return <StudentViewAssignment />;
    }
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  let assignment;
  let course;
  if (state.user && state.user.person.teacher) {
    const assignmentId = parseInt(ownProps.match.params.id);
    const courseId = parseInt(ownProps.match.url.split("/")[2]);
    assignment = state.user.person.teacher.assignments.find(
      assignment =>
        assignment.id === assignmentId && assignment.course_id === courseId
    );
    course = state.user.person.teacher.courses.find(
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
