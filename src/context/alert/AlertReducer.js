const alertReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return {
        ...state,
        msg: action.payload,
        isAlert: true,
      };
    case "CLEAR_ALERT":
      return {
        ...state,
        msg: "",
        isAlert: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
