function logInError(message) {
  return { type: "LOGIN_ERROR", message };
}

function removeError() {
  return { type: "REMOVE_ERROR" };
}

export { logInError, removeError };
