import {
  GET_AVESH_CATEGORY,
  GET_AVESH_CATEGORY_ID,
  GET_AVESH_EVENT_INDEX,
  GET_USER_PROFILE,
} from "./constant";

const initialState = [];

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return action.data;
    default:
      return state;
  }
};

export const getAveshCategoryIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVESH_CATEGORY_ID:
      return action.data;
    default:
      return state;
  }
};
export const getAveshEventIndexReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVESH_EVENT_INDEX:
      return action.data;
    default:
      return state;
  }
};
