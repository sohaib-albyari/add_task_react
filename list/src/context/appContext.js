import React, { useContext, useReducer } from "react";
import { SET_EMAIL } from "./action";
import { reducer } from "./reducer";

const initialState = {
  userName: "",
  isLog: true,
  email: "",
  password: "",
};

const Appcontext = React.createContext();

export const Appprovider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setEmailName = ( userName ) => {
    dispatch({ type: SET_EMAIL, payload: { userName } });
  };

  return (
    <Appcontext.Provider value={{ ...state, setEmailName }}>
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Appcontext);
};
