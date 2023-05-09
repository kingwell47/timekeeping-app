import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { getCurrentEmployee, reset } from "../features/employee/employeeSlice";

const Dashboard = () => {
  const [schedule, setSchedule] = useState({});
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

  const { name, position, currentSchedule, leaves, overtime, timesheet } =
    userData;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        <Typography variant="h5" align="center" gutterBottom>
          {name} Schedule
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>In</TableCell>
              <TableCell>Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {days.map((day) => (
              <TableRow key={day}>
                <TableCell>{day}</TableCell>
                {currentSchedule[day] ? (
                  <>
                    <TableCell>{currentSchedule[day].In}</TableCell>
                    <TableCell>{currentSchedule[day].Out}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default Dashboard;
