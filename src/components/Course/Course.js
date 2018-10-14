import React from "react";
import { connect } from "react-redux";

import TeacherCourse from "./TeacherCourse";
import StudentCourse from "./StudentCourse";

const Course = ({ user }) => {
  if (user) {
    if (user.role === "teacher") {
      return <TeacherCourse user={user} />;
    } else {
      return <StudentCourse />;
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
