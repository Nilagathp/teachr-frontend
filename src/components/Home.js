import React from "react";
import { connect } from "react-redux";

import TeacherHome from "./TeacherHome";
import StudentHome from "./StudentHome";

class Home extends React.Component {
  render() {
    if (this.props.userRole === "teacher") {
      return <TeacherHome />;
    } else {
      return <StudentHome />;
    }
  }
}

const mapStateToProps = state => {
  if (state.user) {
    return {
      userRole: state.user.role
    };
  } else {
    return {
      userRole: null
    };
  }
};

export default connect(mapStateToProps)(Home);
