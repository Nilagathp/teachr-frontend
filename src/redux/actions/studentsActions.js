function updateStudents(students) {
  return { type: "UPDATE_STUDENTS", students };
}

function getStudents(teacherId) {
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
        let currentStudents = json.filter(student =>
          student.courses.map(course => course.teacher_id).includes(teacherId)
        );
        dispatch(updateStudents(currentStudents));
      });
  };
}

export { getStudents };
