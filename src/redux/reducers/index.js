import { combineReducers } from "redux";

import userReducer from "./userReducer";
import studentsReducer from "./studentsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  students: studentsReducer
});

export default rootReducer;
