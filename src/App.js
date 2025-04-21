// главный компонент с роутингом

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Notification from "./components/Notification";
import AppRoutes from "./routes/AppRoutes";
import { darkTheme, lightTheme } from "./theme/theme";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDarkMode(true);
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes toggleTheme={toggleTheme} />
        <Notification />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
