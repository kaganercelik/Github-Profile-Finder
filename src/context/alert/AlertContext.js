import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = {
    msg: "",
    isAlert: false,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg) => {
    dispatch({
      type: "SET_ALERT",
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: "CLEAR_ALERT",
      });
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        msg: state.msg,
        isAlert: state.isAlert,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
