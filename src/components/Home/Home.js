import React from "react";
import { connect } from "react-redux";

import TeacherHome from "./TeacherHome";
import StudentHome from "./StudentHome";

const Home = ({ user }) => {
  if (user) {
    if (user.role === "teacher") {
      //Courses hash to look up name of course from course_id on assignment
      let courses = {};
      user.person.teacher.courses.map(
        course => (courses[course.id] = course.name)
      );

      return <TeacherHome teacher={user.person.teacher} courses={courses} />;
    } else {
      return <StudentHome />;
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

export default connect(mapStateToProps)(Home);
