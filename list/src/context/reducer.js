import {
  LOG_IN_START,
  LOG_IN_SUCSESS,
  LOG_IN_FIELD,
  SET_EMAIL,
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
  if (action.type === SET_EMAIL) {
    return {
      ...state,
      email: action.payload.email,
    };
  }
};
