// домашняя страница (для авторизованных)
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Welcome = ({ toggleTheme }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Paper elevation={3} sx={{ p: 4, width: 400, textAlign: "center" }}>
        <Typography
          variant="h5"
          mb={2}
          sx={{
            wordBreak: "break-all",
            overflowWrap: "break-word",
          }}
        >
          Welcome, {user?.email || "User"}!
        </Typography>
        <Typography variant="body1" mb={3}>
          You have successfully registered.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Welcome;
