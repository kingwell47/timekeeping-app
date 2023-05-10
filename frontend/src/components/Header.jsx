import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Wait for the logout action to complete
      await dispatch(logout()).then(unwrapResult);

      // Dispatch the reset action and navigate to the login page
      dispatch(reset());
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleClick = (local) => {
    if (local) {
      navigate(`/${local}`);
    } else {
      navigate("/");
    }
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Time App
        </Typography>
        {user ? (
          <>
            <Button color="inherit" onClick={() => handleClick()}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => handleClick("leaves")}>
              Leaves
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("register")}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
