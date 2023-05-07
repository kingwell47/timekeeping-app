import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { registerUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      navigate("/", { replace: true });
    }
  }, [authToken, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "role") {
      setRole(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const userData = {
      name,
      email,
      password,
      role,
    };

    dispatch(registerUser(userData));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // delay the setIsLoading(false) call by one second
  };

  useEffect(() => {
    if (user) {
      setName("");
      setEmail("");
      setPassword("");
      setRole("employee");

      // Redirect to login page upon successful registration
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_ERRORS" });
    };
  }, [dispatch]);

  return (
    <Box display="flex" justifyContent="center" p={2}>
      <Box maxWidth={500} width="100%">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Register
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={name}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={role}
                onChange={handleChange}
                required
                fullWidth
                disabled={isLoading}
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="hr">HR</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              {isLoading ? (
                <CircularProgress color="primary" size={40} />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Register
                </Button>
              )}
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              </Grid>
            )}
            {user && (
              <Grid item xs={12}>
                <Typography variant="body1" color="success">
                  Registration successful!
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default Register;
