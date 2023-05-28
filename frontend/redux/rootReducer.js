import { combineReducers } from "redux";
import {
  userReducer,
  getAveshCategoryIdReducer,
  getAveshEventIndexReducer,
} from "./reducer";

export default combineReducers({
  userReducer,
  getAveshCategoryIdReducer,
  getAveshEventIndexReducer,
});
