import React from "react";
import { connect } from "react-redux";

class Course extends React.Component {
  render() {
    return "Course";
  }
}

const mapStateToProps = (state, ownProps) => {
  let courses = state.user.person.teacher.courses;
  let courseId = parseInt(ownProps.match.params.id);
  return {
    course: courses.find(c => c.id === courseId)
  };
};

export default connect(mapStateToProps)(Course);
