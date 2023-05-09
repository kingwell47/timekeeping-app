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

const employeeService = {
  getEmployee,
};

export default employeeService;
