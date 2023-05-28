import {
  GET_AVESH_CATEGORY_ID,
  GET_AVESH_EVENT_INDEX,
  GET_USER_PROFILE,
} from "./constant";

export function getUserProfile(item) {
  return {
    type: GET_USER_PROFILE,
    data: item,
  };
}
export function getAveshCategoryId(item) {
  return {
    type: GET_AVESH_CATEGORY_ID,
    data: item,
  };
}
export function getAveshEventIndex(item) {
  return {
    type: GET_AVESH_EVENT_INDEX,
    data: item,
  };
}
