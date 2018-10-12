import React from "react";
import { connect } from "react-redux";

import TeacherCourse from "./TeacherCourse";
import StudentCourse from "./StudentCourse";
import LogIn from "./LogIn";

class Course extends React.Component {
  render() {
    if (this.props.user) {
      if (this.props.user.role === "teacher") {
        return <TeacherCourse user={this.props.user} />;
      } else {
        return <StudentCourse />;
      }
    } else {
      return <LogIn />;
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Course);
