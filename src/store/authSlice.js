// логика авторизации (redux slice)
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { showNotification } from "./notificationSlice";

// Регистрация
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const registeredEmails =
        JSON.parse(localStorage.getItem("registeredEmails")) || [];

      if (registeredEmails.includes(email)) {
        dispatch(
          showNotification({
            message: "Email уже зарегистрирован",
            type: "error",
          })
        );
        return rejectWithValue("Этот email уже зарегестрирован");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Сохраняем email в свой список

      const updatedEmails = [...registeredEmails, email];

      localStorage.setItem("registeredEmails", JSON.stringify(updatedEmails));

      const userData = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      };

      // Сохраняем в localStorage для перезагрузок
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(
        showNotification({ message: "Успешная регистрация!", type: "success" })
      );

      return userData;
    } catch (error) {
      dispatch(showNotification({ message: error.message, type: "error" }));
      return rejectWithValue(error.message);
    }
  }
);

// Вход
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      };

      // Сохраняем для перезагрузок
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(
        showNotification({ message: "Успешный вход!", type: "success" })
      );

      return userData;
    } catch (error) {
      dispatch(showNotification({ message: "Ошибка входа", type: "error" }));

      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // регистрация
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // вход
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
