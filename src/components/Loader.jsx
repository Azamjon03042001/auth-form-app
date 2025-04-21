import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <CircularProgress size={20} />
  </Box>
);

export default Loader;
