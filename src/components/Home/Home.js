import React from "react";
import { connect } from "react-redux";

import TeacherHome from "./TeacherHome";
import StudentHome from "./StudentHome";

const Home = ({ user }) => {
  if (user) {
    if (user.role === "teacher") {
      //Courses hash to look up name of course from course_id on assignment
      let coursesName = {};
      user.person.teacher.courses.map(
        course => (coursesName[course.id] = course.name)
      );

      return (
        <div className="home">
          <TeacherHome
            teacher={user.person.teacher}
            coursesName={coursesName}
          />
        </div>
      );
    } else {
      let coursesName = {};
      user.person.student.courses.map(
        course => (coursesName[course.id] = course.name)
      );

      return (
        <div className="home">
          <StudentHome
            student={user.person.student}
            coursesName={coursesName}
          />
        </div>
      );
    }
  } else {
    return <div className="home" />;
  }
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Home);

export { Home };
