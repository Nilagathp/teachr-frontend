import React from "react";
import { connect } from "react-redux";

import TeacherViewAssignment from "./TeacherViewAssignment";
import StudentViewAssignment from "./StudentViewAssignment";
import LogIn from "../LogIn";

const Assignment = ({ user, assignment }) => {
  if (user) {
    if (user.role === "teacher") {
      return <TeacherViewAssignment user={user} assignment={assignment} />;
    } else {
      return <StudentViewAssignment />;
    }
  } else {
    return <LogIn />;
  }
};

const mapStateToProps = (state, ownProps) => {
  let assignment;
  if (state.user && state.user.person.teacher) {
    const assignmentId = parseInt(ownProps.match.params.id);
    const courseId = parseInt(ownProps.match.url.split("/")[2]);
    assignment = state.user.person.teacher.assignments.find(
      assignment =>
        assignment.id === assignmentId && assignment.course_id === courseId
    );
  }
  return {
    user: state.user,
    assignment: assignment
  };
};

export default connect(mapStateToProps)(Assignment);
