import { removeCourse } from "./courseActions";
import { removeStatus } from "./statusActions";
import { removeCategory } from "./categoryActions";
import { removeValue } from "./valueActions";
import { BASE_URL } from "../../config";

function updateUser(user) {
  return { type: "UPDATE_USER", user };
}

function logInUser(userParams) {
  return function(dispatch) {
    fetch(`${BASE_URL}/login`, {
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
    dispatch(removeCourse());
    dispatch(removeStatus());
    dispatch(removeCategory());
    dispatch(removeValue());
  };
}

function getUserFromToken(token) {
  return function(dispatch) {
    fetch(`${BASE_URL}/profile`, {
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
