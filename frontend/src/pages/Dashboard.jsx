import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import { getCurrentEmployee, reset } from "../features/employee/employeeSlice";
import Schedule from "../components/Schedule";
import Timesheet from "../components/TimeSheet";
import ClockInOutButton from "../components/ClockInOutButton";

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
    <>
      <Typography variant="h4" align="center" mt={2}>
        {name}
      </Typography>
      <ClockInOutButton {...{ clockedIn, lastClockInTime }} />
      <Schedule name={name} schedule={currentSchedule} />
      <Timesheet timesheet={timesheet} />
    </>
  );
};

export default Dashboard;
