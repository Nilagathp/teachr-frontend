import React from "react";
import { connect } from "react-redux";

import TeacherHome from "./TeacherHome";
import StudentHome from "./StudentHome";
import LogIn from "./LogIn";

class Home extends React.Component {
  render() {
    if (this.props.user) {
      if (this.props.user.role === "teacher") {
        return <TeacherHome user={this.props.user} />;
      } else {
        return <StudentHome />;
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

export default connect(mapStateToProps)(Home);
