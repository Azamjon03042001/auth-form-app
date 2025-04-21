import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const API_KEY = "YOUR_FIREBASE_API_KEY"; // вставь сюда свой API key из Firebase

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      const url = isRegister
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            returnSecureToken: true,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          const errorMessage = data.error?.message || "Authentication failed";
          if (errorMessage === "EMAIL_EXISTS") {
            setErrors({ email: "This email is already registered" });
          } else if (errorMessage === "EMAIL_NOT_FOUND") {
            setErrors({ email: "Email not found" });
          } else if (errorMessage === "INVALID_PASSWORD") {
            setErrors({ password: "Incorrect password" });
          } else {
            alert(errorMessage);
          }
        } else {
          console.log("Success:", data);
          // Здесь можешь сохранять токен или email в localStorage
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
  });

  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3}>
          {isRegister ? "Register" : "Login"}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={formik.isSubmitting}
          >
            {isRegister ? "Register" : "Login"}
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister
              ? "Already have an account? Log in"
              : "Don't have an account? Register"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AuthForm;
