import React from "react";
import { connect } from "react-redux";

import TeacherCourse from "./TeacherCourse";
import StudentCourse from "./StudentCourse";

const Course = ({ user }) => {
  if (user) {
    if (user.role === "teacher") {
      return <TeacherCourse teacher={user.person.teacher} />;
    } else {
      return <StudentCourse student={user.person.student} />;
    }
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Course);
