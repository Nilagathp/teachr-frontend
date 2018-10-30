import { getUserFromToken } from "./userActions";
import { createStudentAssignment } from "./studentAssignmentActions";
import { deleteStudentAssignment } from "./studentAssignmentActions";
import { BASE_URL } from "../../config";

function createAssignment(assignmentParams, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/assignments`, {
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

function createAndAssignAssignment(assignmentParams, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/assignments`, {
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
        dispatch(assignAssignment(json.id));
        push(`/course/${json.course.id}/assignment/${json.id}`);
      });
  };
}

function assignAssignment(assignmentId) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/assignments/${assignmentId}`, {
      method: "PATCH",
      body: JSON.stringify({ assignment: { assigned: true } }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        json.course.students.forEach(student =>
          dispatch(createStudentAssignment(student.id, assignmentId))
        );
        dispatch(getUserFromToken(token));
      });
  };
}

function unassignAssignment(assignmentId, studentAssignments) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/assignments/${assignmentId}`, {
      method: "PATCH",
      body: JSON.stringify({ assignment: { assigned: false } }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        json.course.students.forEach(student => {
          let studentAssignment = studentAssignments.find(
            studentAssignment =>
              studentAssignment.student_id === student.id &&
              studentAssignment.assignment_id === assignmentId
          );
          dispatch(deleteStudentAssignment(studentAssignment.id));
        });
        dispatch(getUserFromToken(token));
      });
  };
}

function updateAssignment(assignmentId, assignmentParams, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/assignments/${assignmentId}`, {
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
    fetch(`${BASE_URL}/assignments/${assignmentId}`, {
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

export {
  createAssignment,
  createAndAssignAssignment,
  assignAssignment,
  unassignAssignment,
  updateAssignment,
  deleteAssignment
};
