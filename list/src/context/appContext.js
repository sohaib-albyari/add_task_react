import React, { useContext, useReducer } from "react";
import { LOG_OUT, SET_USER_NAME } from "./action";
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

  const setUserName = (userName) => {
    dispatch({ type: SET_USER_NAME, payload: { userName } });
    console.log(userName);
  };

  // const setUserNameLogOut = (userName) => {
  //   dispatch({ type: LOG_OUT, payload: { userName } });
  // };

  return (
    <Appcontext.Provider value={{ ...state, setUserName }}>
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Appcontext);
};
