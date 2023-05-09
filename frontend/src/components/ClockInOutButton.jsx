import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import moment from "moment-timezone";

import {
  clockInOut,
  checkIfClockedIn,
} from "../features/employee/employeeSlice";

const ClockInOutButton = ({ clockedIn, lastClockInTime }) => {
  const [clockedInStatus, setClockedInStatus] = useState(clockedIn);
  const [lastClockTime, setLastClockTime] = useState(lastClockInTime);

  const dispatch = useDispatch();

  const { isClockedIn, clockedInTime, isLoading, isError, message } =
    useSelector((state) => state.employee);

  const handleClockInOut = () => {
    dispatch(clockInOut());
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    dispatch(checkIfClockedIn());
  }, [dispatch]);

  useEffect(() => {
    setClockedInStatus(isClockedIn);
    setLastClockTime(clockedInTime);
  }, [isClockedIn, clockedInTime]);

  const formatTime = (time) => {
    if (!time) {
      return "-";
    }
    return moment.tz(time, "UTC").tz(moment.tz.guess()).format("h:mm A");
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Box>
        <Typography variant="body1" align="center" gutterBottom>
          {isClockedIn
            ? "You are currently clocked in."
            : "You are currently clocked out."}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {clockedInStatus
            ? `Last clock in time: ${formatTime(lastClockTime)}`
            : null}
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button variant="contained" onClick={handleClockInOut}>
            {clockedInStatus ? "Clock Out" : "Clock In"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ClockInOutButton;
