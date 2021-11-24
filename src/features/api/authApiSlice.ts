import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRegistration, getLogin, check, getLogout } from "./authApi";
import Cookies from "js-cookie";
import axios from "axios";

interface authDataI {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    username: string;
    id: string;
  };
}
interface logoutI {
  deletedCount: number;
}
interface userDataI {
  username: string;
  email: string;
  password: string;
}
interface loginUserDataI {
  email: string;
  password: string;
}
interface initialStateI {
  user: authDataI;
  isAuth: boolean;
  loading: boolean;
}

export const registration = createAsyncThunk(
  "auth/registration",
  async (userData: userDataI) => {
    const response = await getRegistration(userData);
    return response.data;
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (userData: loginUserDataI) => {
    const response = await getLogin(userData);
    return response.data;
  }
);
export const refresh = createAsyncThunk("auth/refresh", async () => {
  const response = await check();
  return response.data;
});
export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await getLogout();
  return response.data;
});

const initialState = {
  user: {
    accessToken: "",
    refreshToken: "",
    user: {
      email: "",
      username: "",
      id: "",
    },
  },
  isAuth: false,
  loading: false,
} as initialStateI;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = true;
      state.isAuth = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = true;
      state.isAuth = true;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = true;
      state.isAuth = true;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.user = {
        accessToken: "",
        refreshToken: "",
        user: {
          email: "",
          username: "",
          id: "",
        },
      };
      state.loading = false;
      state.isAuth = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {
        accessToken: "",
        refreshToken: "",
        user: {
          email: "",
          username: "",
          id: "",
        },
      };
      state.loading = false;
      state.isAuth = false;
    });
  },
});

export default authSlice.reducer;
//dispatch(registration(123))
