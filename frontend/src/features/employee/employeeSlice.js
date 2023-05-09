import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

const initialState = {
  currentEmployee: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCurrentEmployee = createAsyncThunk(
  "employee/getCurrentEmployee",
  async (_, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.token);
    try {
      return await employeeService.getEmployee(user.token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentEmployee = action.payload;
      })
      .addCase(getCurrentEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentEmployee = null;
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
