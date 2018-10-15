import { getUserFromToken } from "./userActions";

function createAssignment(assignmentParams, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/assignments", {
      method: "POST",
      body: JSON.stringify({ assignment: assignmentParams }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        dispatch(getUserFromToken(token));
        push(`/course/${json.course.id}/assignment/${json.id}`);
      });
  };
}

function updateAssignment(assignmentId, assignmentParams, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/assignments/${assignmentId}`, {
      method: "PATCH",
      body: JSON.stringify({ assignment: assignmentParams }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        dispatch(getUserFromToken(token));
        push(`/course/${json.course.id}/assignment/${json.id}`);
      });
  };
}

function deleteAssignment(assignmentId, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/assignments/${assignmentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        dispatch(getUserFromToken(token));
        push(`/home`);
      });
  };
}

export { createAssignment, updateAssignment, deleteAssignment };
