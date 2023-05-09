import axios from "axios";

const API_URL = "/api/employees/";

// Get current employee
const getEmployee = async (token) => {
  const config = {
    headers: { Authorization: "Bearer " + token },
  };

  const response = await axios.get(API_URL + "me", config);

  return response.data;
};

// Clock-in/out
const clockMeInOut = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(API_URL + "clock", {}, config);
  return response.data;
};

// Check if currently clocked in
const isClockedIn = async (token) => {
  const config = {
    headers: { Authorization: "Bearer " + token },
  };

  const response = await axios.get(API_URL + "clock", config);

  return response.data;
};

const employeeService = {
  getEmployee,
  clockMeInOut,
  isClockedIn,
};

export default employeeService;
