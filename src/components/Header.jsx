import { Brightness4, Brightness7 } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/authSlice";

const Header = ({ toggleTheme }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">
          {user ? `Привет, ${user.email} ` : "Страница регистрации"}
        </Typography>

        <div>
          {user && (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                sx={{ mr: 1 }}
              >
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => dispatch(logout())}>
                Выйти
              </Button>
            </>
          )}
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
