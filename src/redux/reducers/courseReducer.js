const courseReducer = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_COURSE":
      return action.courseId;
    case "REMOVE_COURSE":
      return null;
    default:
      return state;
  }
};

export default courseReducer;
