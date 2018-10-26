function updateValue(value) {
  return { type: "UPDATE_SELECTED_VALUE", value };
}

function changeValue(value) {
  return function(dispatch) {
    dispatch(updateValue(value));
  };
}

function removeValue() {
  return { type: "REMOVE_VALUE" };
}

function clearValue() {
  return function(dispatch) {
    dispatch(removeValue());
  };
}

export { updateValue, changeValue, removeValue, clearValue };
