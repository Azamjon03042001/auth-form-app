import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={10}
      gap={2}
    >
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
      <Typography typography="h6">{user.email}</Typography>
      <Button variant="outlined" color="error" onClick={handleLogout}>
        Выйти
      </Button>
    </Box>
  );
};

export default UserInfo;
