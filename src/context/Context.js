import { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  isError: false,
};

export const Context = createContext(initialState);

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        isError: state.isError,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
