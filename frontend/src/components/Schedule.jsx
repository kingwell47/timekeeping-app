import React from "react";

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

const Schedule = ({ name, schedule }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (!schedule || !name) {
    return <CircularProgress />;
  }
  return (
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
          {schedule &&
            days.map((day) => (
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
  );
};

export default Schedule;
