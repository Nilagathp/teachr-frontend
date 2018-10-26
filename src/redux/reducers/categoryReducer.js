const categoryReducer = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE_SELECTED_CATEGORY":
      return action.category;
    case "REMOVE_CATEGORY":
      return 0;
    default:
      return state;
  }
};

export default categoryReducer;
