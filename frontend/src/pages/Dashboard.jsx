import { useEffect, useState } from "react";

import { Outlet, Navigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Dashboard = () => {
  const [schedule, setSchedule] = useState({});

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Schedule
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
                {schedule[day] ? (
                  <>
                    <TableCell>{schedule[day].In}</TableCell>
                    <TableCell>{schedule[day].Out}</TableCell>
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
      <Outlet />
    </>
  );
};

export default Dashboard;
