function updateStatus(status) {
  return { type: "UPDATE_SELECTED_STATUS", status };
}

function changeStatus(status) {
  return function(dispatch) {
    dispatch(updateStatus(status));
  };
}

function removeStatus() {
  return { type: "REMOVE_STATUS" };
}

function clearStatus() {
  return function(dispatch) {
    dispatch(removeStatus());
  };
}

export { updateStatus, changeStatus, removeStatus, clearStatus };
