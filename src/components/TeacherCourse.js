import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class TeacherCourse extends React.Component {
  render() {
    return <h4>{this.props.course.name}</h4>;
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log(ownProps);
  let courses = state.user.person.teacher.courses;
  let courseId = parseInt(ownProps.match.params.id);
  return {
    course: courses.find(c => c.id === courseId)
  };
};

export default withRouter(connect(mapStateToProps)(TeacherCourse));
