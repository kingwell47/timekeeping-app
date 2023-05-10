import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { getCurrentEmployee, reset } from "../features/employee/employeeSlice";
import Schedule from "../components/Schedule";
import Timesheet from "../components/TimeSheet";
import ClockInOutButton from "../components/ClockInOutButton";
import Profile from "../components/Profile";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { currentEmployee, isLoading, isError, message } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getCurrentEmployee());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, dispatch, message]);

  useEffect(() => {
    if (currentEmployee) {
      setUserData(currentEmployee);
    }
  }, [currentEmployee]);

  const {
    name,
    position,
    currentSchedule,
    leaves,
    overtime,
    timesheet,
    clockedIn,
    lastClockInTime,
  } = userData;

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
      <Box mr={{ md: 2 }}>
        <Profile {...{ name, position, leaves, overtime }} />
        <ClockInOutButton {...{ clockedIn, lastClockInTime }} />
      </Box>
      <Box flexGrow={1} mr={{ md: 2 }} minWidth={300}>
        <Schedule name={name} schedule={currentSchedule} />
        <Timesheet timesheet={timesheet} />
      </Box>
    </Box>
  );
};

export default Dashboard;
