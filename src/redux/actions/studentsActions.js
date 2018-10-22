import { createStudentAssignment } from "./studentAssignmentActions";

function getStudentsInCourse(courseId, assignmentId) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/students", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        let studentsInCourse = json.filter(student =>
          student.courses.map(course => course.id).includes(courseId)
        );
        studentsInCourse.forEach(student =>
          dispatch(createStudentAssignment(student.id, assignmentId))
        );
      });
  };
}

export { getStudentsInCourse };
