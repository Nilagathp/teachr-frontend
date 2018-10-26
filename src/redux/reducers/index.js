import { combineReducers } from "redux";

import userReducer from "./userReducer";
import courseReducer from "./courseReducer";
import categoryReducer from "./categoryReducer";
import statusReducer from "./statusReducer";
import valueReducer from "./valueReducer";

const rootReducer = combineReducers({
  user: userReducer,
  selectedCourseId: courseReducer,
  selectedCategory: categoryReducer,
  selectedStatus: statusReducer,
  value: valueReducer
});

export default rootReducer;
