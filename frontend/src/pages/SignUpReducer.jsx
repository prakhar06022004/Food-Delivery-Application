export const initialValue = {
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  role: "user",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return action.payload;
    default:
      return state;
  }
};
