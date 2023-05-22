import { GET_USER_PROFILE } from "./constant";

const initialState = [];

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return action.data;
    default:
      return state;
  }
};
