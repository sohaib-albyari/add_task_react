import React, { useContext, useReducer } from "react";
import { LOG_IN_START, LOG_IN_SUCSESS, LOG_IN_FIELD } from "./action";
import { reducer } from "./reducer";

const initialState = {
  userName: "",
  isLog: false,
};

const Appcontext = React.createContext();

export const Appprovider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Appcontext.Provider value={{ ...state }}>{children}</Appcontext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Appcontext);
};
