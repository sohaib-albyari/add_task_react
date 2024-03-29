import {
  LOG_IN_START,
  LOG_IN_SUCSESS,
  LOG_IN_FIELD,
  SET_USER_NAME,
  LOG_OUT,
} from "./action";

export const reducer = (state, action) => {
  if (action.type === LOG_IN_START) {
    return true;
  }
  if (action.type === LOG_IN_SUCSESS) {
    return true;
  }
  if (action.type === LOG_IN_FIELD) {
    return true;
  }
  if (action.type === SET_USER_NAME) {
    return {
      ...state,
      userName: action.payload.userName,
    };
  }
  if (action.type === LOG_OUT) {
    return {
      ...state,
      userName: action.payload.userName,
    };
  }
};
