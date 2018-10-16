const studentsReducer = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_STUDENTS":
      return action.students;
    default:
      return state;
  }
};

export default studentsReducer;
