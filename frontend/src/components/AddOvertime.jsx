import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import axios from "axios";

const AddOvertime = () => {
  const [overtimeData, setOvertimeData] = useState({
    date: "",
    hours: "",
    nightHours: "",
    timeIn: "",
    timeOut: "",
    reason: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setOvertimeData({
      ...overtimeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      console.log(token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "/api/employees/me/overtime",
        overtimeData,
        config
      );
      setOvertimeData({
        date: "",
        hours: "",
        nightHours: "",
        timeIn: "",
        timeOut: "",
        reason: "",
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Card>
      <CardHeader title="Add Overtime" />
      <CardContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleFormSubmit}
        >
          <TextField
            label="Date"
            type="date"
            name="date"
            value={overtimeData.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
            sx={{ width: "100%" }}
          />
          <TextField
            label="Hours"
            type="number"
            name="hours"
            value={overtimeData.hours}
            onChange={handleInputChange}
            required
            sx={{ mt: 2, width: "100%" }}
          />
          <TextField
            label="Night Hours"
            type="number"
            name="nightHours"
            value={overtimeData.nightHours}
            onChange={handleInputChange}
            required
            sx={{ mt: 2, width: "100%" }}
          />
          <TextField
            label="Time In"
            type="time"
            name="timeIn"
            value={overtimeData.timeIn}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            required
            sx={{ mt: 2, width: "100%" }}
          />
          <TextField
            label="Time Out"
            type="time"
            name="timeOut"
            value={overtimeData.timeOut}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            required
            sx={{ mt: 2, width: "100%" }}
          />
          <TextField
            label="Reason"
            type="text"
            name="reason"
            value={overtimeData.reason}
            onChange={handleInputChange}
            required
            sx={{ mt: 2, width: "100%" }}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Add Overtime
          </Button>
        </Box>
        {message && (
          <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
        {error && (
          <Typography variant="body1" color="error.main" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AddOvertime;
