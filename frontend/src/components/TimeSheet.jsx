import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CircularProgress,
} from "@mui/material";
import moment from "moment-timezone";

const Timesheet = ({ timesheet }) => {
  const formatTime = (time) => {
    if (!time) {
      return "-";
    }
    return moment.tz(time, "UTC").tz(moment.tz.guess()).format("h:mm A");
  };

  if (!timesheet) {
    return <CircularProgress />;
  }

  return (
    <Card>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Timesheet
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Day of Week</TableCell>
              <TableCell>Time In</TableCell>
              <TableCell>Time Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timesheet.map((entry) => (
              <TableRow key={entry._id}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{moment(entry.date).format("dddd")}</TableCell>
                <TableCell>{formatTime(entry.timeIn)}</TableCell>
                <TableCell>{formatTime(entry.timeOut) || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default Timesheet;
