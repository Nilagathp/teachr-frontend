function updateStudents(students) {
  return { type: "UPDATE_STUDENTS", students };
}

function getStudents(userParams) {
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
        dispatch(updateStudents(json));
      });
  };
}

export { getStudents };
