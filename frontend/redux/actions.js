import { GET_USER_PROFILE } from "./constant";

export function getUserProfile(item) {
  return {
    type: GET_USER_PROFILE,
    data: item,
  };
}
