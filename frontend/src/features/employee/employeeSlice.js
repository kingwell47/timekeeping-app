import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

const initialState = {
  currentEmployee: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isClockedIn: false,
  clockedInTime: null,
};

export const getCurrentEmployee = createAsyncThunk(
  "employee/getCurrentEmployee",
  async (_, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("user"));
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

export const clockInOut = createAsyncThunk(
  "employee/clockInOut",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      const response = await employeeService.clockMeInOut(token);
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const checkIfClockedIn = createAsyncThunk(
  "employee/checkIfClockedIn",
  async (_, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      return await employeeService.isClockedIn(user.token);
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
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
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
      })
      .addCase(clockInOut.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload;
        state.isClockedIn = action.payload.isClockedIn;
      })
      .addCase(clockInOut.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkIfClockedIn.fulfilled, (state, action) => {
        state.isClockedIn = action.payload.clockedIn;
        state.clockedInTime = action.payload.timeIn;
      })
      .addCase(checkIfClockedIn.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isClockedIn = false;
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
