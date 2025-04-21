import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const now = new Date().toLocaleString();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Панель пользователя
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Информация о пользователе</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Текущее время: {now}</Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
