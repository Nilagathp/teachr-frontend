const errorReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return action.message;
    case "REMOVE_ERROR":
      return null;
    default:
      return state;
  }
};

export default errorReducer;
