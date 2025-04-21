// страница с формой регистрации
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import { loginUser, registerUser } from "../../store/authSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const toggleMode = () => {
    setIsLogin((prev) => !prev);
  };
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Неверный email").required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Минимум 6 символов")
        .required("Обязательное поле"),
      confirmPassword: Yup.string().when("isLogin", {
        is: false,
        then: Yup.string()
          .oneOf([Yup.ref("password")], "Пароли не совпадают")
          .required("Обязательное поле"),
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      const { email, password } = values;
      if (isLogin) {
        dispatch(loginUser({ email, password }));
      } else {
        dispatch(registerUser({ email, password }));
      }
      resetForm();
    },
  });

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h5" mb={2} align="center">
        {isLogin ? "Вход в аккаунт" : "Регистрация"}
      </Typography>

      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          margin="normal"
          // value={formik.values.email}
          // onChange={formik.handleChange}
          {...formik.getFieldProps("email")}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Пароль"
          margin="normal"
          type={showPassword ? "text" : "password"}
          {...formik.getFieldProps("password")}
          // value={formik.values.password}
          // onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleShowPassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {!isLogin && (
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Повторите пароль"
            margin="normal"
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("confirmPassword")}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {!loading ? (isLogin ? "Войти" : "Зарегистрироваться") : " "}
          {loading && (
            <span style={{ marginLeft: 8 }}>
              <Loader />
            </span>
          )}
        </Button>

        <Button onClick={toggleMode} fullWidth sx={{ mt: 1 }} variant="text">
          {isLogin
            ? "Нет аккаунта? Зарегистрироваться"
            : "Уже есть аккаунт? Войти"}
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
