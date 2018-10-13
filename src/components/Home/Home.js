import React from "react";
import { connect } from "react-redux";

import TeacherHome from "./TeacherHome";
import StudentHome from "./StudentHome";
import LogIn from "../LogIn";

const Home = ({ user }) => {
  if (user) {
    if (user.role === "teacher") {
      return <TeacherHome teacher={user.person.teacher} />;
    } else {
      return <StudentHome />;
    }
  } else {
    return <LogIn />;
  }
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Home);
