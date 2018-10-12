function updateUser(user) {
  return { type: "UPDATE_USER", user };
}

function getUserFromToken(token) {
  return function(dispatch) {
    console.log(dispatch);
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(json => dispatch(updateUser(json.user)));
  };
}

export { updateUser, getUserFromToken };
