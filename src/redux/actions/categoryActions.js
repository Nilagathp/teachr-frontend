function updateCategory(category) {
  return { type: "UPDATE_SELECTED_CATEGORY", category };
}

function changeCategory(category) {
  return function(dispatch) {
    dispatch(updateCategory(category));
  };
}

function removeCategory() {
  return { type: "REMOVE_CATEGORY" };
}

function clearCategory() {
  return function(dispatch) {
    dispatch(removeCategory());
  };
}

export { updateCategory, changeCategory, removeCategory, clearCategory };
