import { combineReducers } from "redux";

import userReducer from "./userReducer";
import courseReducer from "./courseReducer";
import categoryReducer from "./categoryReducer";
import statusReducer from "./statusReducer";
import valueReducer from "./valueReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  user: userReducer,
  selectedCourseId: courseReducer,
  selectedCategory: categoryReducer,
  selectedStatus: statusReducer,
  value: valueReducer,
  error: errorReducer
});

export default rootReducer;
