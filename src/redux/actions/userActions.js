function updateUser(user) {
  return { type: "UPDATE_USER", user };
}

function logInUser(userParams) {
  return function(dispatch) {
    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({ user: userParams }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(r => r.json())
      .then(json => {
        if (json.jwt) {
          localStorage.setItem("token", json.jwt);
          dispatch(updateUser(json.user));
        }
      });
  };
}

function logOutUser() {
  return function(dispatch) {
    localStorage.clear();
    dispatch(updateUser(null));
  };
}

function getUserFromToken(token) {
  return function(dispatch) {
    fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(r => r.json())
      .then(json => {
        dispatch(updateUser(json.user));
      });
  };
}

export { updateUser, logInUser, logOutUser, getUserFromToken };
