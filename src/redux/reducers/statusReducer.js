const statusReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_STATUS":
      return action.status;
    case "REMOVE_STATUS":
      return "";
    default:
      return state;
  }
};

export default statusReducer;
