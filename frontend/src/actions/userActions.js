import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = (userData) => async (dispatch) => {
  const params = new URLSearchParams(userData).toString();

  try {
    const response = await axios.post(`${API_URL}/api/users`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
  } catch (err) {
    const errorMessage = err.response?.data?.message || "An error occurred";
    console.error(errorMessage);
    dispatch({ type: "REGISTER_FAIL", payload: errorMessage });
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const params = new URLSearchParams(userData);

    const response = await axios.post(
      `${API_URL}/api/users/login`,
      params,
      config
    );

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });

    // Save token to local storage
    localStorage.setItem("authToken", response.data.token);
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
