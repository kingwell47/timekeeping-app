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
    default:
      return state;
  }
};
