import { LOG_IN_START, LOG_IN_SUCSESS, LOG_IN_FIELD } from "./action";

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
};
