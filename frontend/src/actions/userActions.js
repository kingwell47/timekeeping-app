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
