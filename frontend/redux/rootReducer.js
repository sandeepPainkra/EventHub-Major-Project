import { combineReducers } from "redux";
import { userReducer, getAveshCategoryReducer } from "./reducer";

export default combineReducers({
  userReducer,
  getAveshCategoryReducer,
});
