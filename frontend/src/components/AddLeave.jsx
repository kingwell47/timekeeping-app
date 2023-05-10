import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AddLeave = () => {
  const [leaveData, setLeaveData] = useState({
    date: "",
    type: "",
    replacedBy: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setLeaveData({
      ...leaveData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "/api/employees/me/leaves",
        leaveData,
        config
      );
      setMessage(response.data.message);
      setLeaveData({
        date: "",
        type: "",
        replacedBy: "",
      });
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto" }}>
      <CardHeader title="Add a Leave" />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={leaveData.date}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="leave-type-label">Type</InputLabel>
            <Select
              labelId="leave-type-label"
              id="leave-type"
              name="type"
              value={leaveData.type}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="Vacation">Vacation</MenuItem>
              <MenuItem value="Sick">Sick</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            label="Replaced by"
            name="replacedBy"
            value={leaveData.replacedBy}
            onChange={handleInputChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Add Leave
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

export default AddLeave;
