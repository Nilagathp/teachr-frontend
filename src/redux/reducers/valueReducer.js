const valueReducer = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_VALUE":
      return action.value;
    case "REMOVE_VALUE":
      return 0;
    default:
      return state;
  }
};

export default valueReducer;
