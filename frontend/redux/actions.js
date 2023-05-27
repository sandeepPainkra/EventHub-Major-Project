import { GET_AVESH_CATEGORY, GET_USER_PROFILE } from "./constant";

export function getUserProfile(item) {
  return {
    type: GET_USER_PROFILE,
    data: item,
  };
}
export function getAveshCategory(item) {
  return {
    type: GET_AVESH_CATEGORY,
    data: item,
  };
}
