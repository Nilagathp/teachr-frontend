const courseReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_COURSE":
      return action.courseId;
    case "REMOVE_COURSE":
      return "";
    default:
      return state;
  }
};

export default courseReducer;
