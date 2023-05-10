import React, { useState, useEffect } from "react";
import AddLeave from "../components/AddLeave";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentEmployee, reset } from "../features/employee/employeeSlice";
import { Box, CircularProgress } from "@mui/material";
import LeavesOT from "../components/LeavesOT";
import AddOvertime from "../components/AddOvertime";

const Leaves = () => {
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

  const { leaves, overtime } = userData;

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }}>
      <Box mr={{ md: 2 }} minWidth={300}>
        <AddLeave />
      </Box>
      <Box mr={{ md: 2 }} minWidth={300}>
        <AddOvertime />
      </Box>
      <Box flexGrow={1} minWidth={300}>
        <LeavesOT {...{ leaves, overtime }} />
      </Box>
    </Box>
  );
};

export default Leaves;
