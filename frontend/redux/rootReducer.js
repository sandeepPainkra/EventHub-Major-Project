import { combineReducers } from "redux";
import { userReducer, getAveshCategoryIdReducer } from "./reducer";

export default combineReducers({
  userReducer,
  getAveshCategoryIdReducer,
});
