const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
