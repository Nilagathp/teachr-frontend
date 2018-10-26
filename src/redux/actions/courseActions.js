function updateCourse(courseId) {
  return { type: "UPDATE_SELECTED_COURSE", courseId };
}

function changeCourse(courseId, push) {
  return function(dispatch) {
    dispatch(updateCourse(courseId));
    push(`/course/${courseId}`);
  };
}

function removeCourse() {
  return { type: "REMOVE_COURSE" };
}

function clearCourse(push) {
  return function(dispatch) {
    dispatch(removeCourse());
  };
}

export { updateCourse, changeCourse, removeCourse, clearCourse };
