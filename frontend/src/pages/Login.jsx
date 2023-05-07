import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { loginUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      navigate("/", { replace: true });
    }
  }, [authToken, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // delay the setIsLoading(false) call by one second
  };

  useEffect(() => {
    if (user) {
      setEmail("");
      setPassword("");

      // Redirect to dashboard page upon successful login
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [user, navigate]);

  return (
    <Box display="flex" justifyContent="center" p={2}>
      <Box maxWidth={500} width="100%">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              {isLoading ? (
                <CircularProgress color="primary" size={40} />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Login
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
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
