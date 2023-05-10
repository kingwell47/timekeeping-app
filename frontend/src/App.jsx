import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Leaves from "./pages/Leaves";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leaves" element={<Leaves />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
