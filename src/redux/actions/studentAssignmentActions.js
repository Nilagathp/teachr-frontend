import { getUserFromToken } from "./userActions";

function createStudentAssignment(studentId, assignmentId) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/student_assignments", {
      method: "POST",
      body: JSON.stringify({
        student_id: studentId,
        assignment_id: assignmentId
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => dispatch(getUserFromToken(token)));
  };
}

function deleteStudentAssignment(studentAssignmentId) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/student_assignments/${studentAssignmentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => dispatch(getUserFromToken(token)));
  };
}

function startStudentAssignment(studentAssignmentId, courseId, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/student_assignments/${studentAssignmentId}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: "in_progress"
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        dispatch(getUserFromToken(token));
        push(`/course/${courseId}/assignment/${json.assignment_id}`);
      });
  };
}

function saveStudentAssignment(studentAssignmentId, answers, courseId, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/student_assignments/${studentAssignmentId}`, {
      method: "PATCH",
      body: JSON.stringify({
        answers: answers,
        status: "in_progress"
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        dispatch(getUserFromToken(token));
        push(`/course/${courseId}/`);
      });
  };
}

function submitStudentAssignment(studentAssignmentId, answers, courseId, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/student_assignments/${studentAssignmentId}`, {
      method: "PATCH",
      body: JSON.stringify({
        answers: answers,
        status: "submitted"
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        dispatch(getUserFromToken(token));
        push(`/course/${courseId}/`);
      });
  };
}

function gradeStudentAssignment(studentAssignmentId, points, courseId, push) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/student_assignments/${studentAssignmentId}`, {
      method: "PATCH",
      body: JSON.stringify({
        points_earned: points,
        status: "graded"
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        dispatch(getUserFromToken(token));
        push(`/course/${courseId}/assignment/${json.assignment_id}/grade`);
      });
  };
}

export {
  createStudentAssignment,
  startStudentAssignment,
  saveStudentAssignment,
  submitStudentAssignment,
  gradeStudentAssignment,
  deleteStudentAssignment
};
