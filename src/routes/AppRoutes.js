import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import ProjectDescription from "../components/ProjectDescription";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import RegisterForm from "../pages/RegisterForm/RegisterForm";
import Welcome from "../pages/Welcome/Welcome";

const AppRoutes = ({ toggleTheme }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Header toggleTheme={toggleTheme} />

      <Box
        component="main"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          p: 2,
          gap: 2,
        }}
      >
        {/* Левая колонка: описание проекта */}
        <Box
          sx={{
            width: { xs: "100%", md: "35%" },
            flexShrink: 0,
          }}
        >
          <ProjectDescription />
        </Box>

        {/* Правая колонка: формы и страницы */}
        <Box
          sx={{
            width: { xs: "100%", md: "65%" },
          }}
        >
          <Routes>
            <Route path="/" element={user ? <Welcome /> : <RegisterForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default AppRoutes;
