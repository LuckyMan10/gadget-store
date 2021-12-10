import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRegistration, getLogin, check, getLogout } from "./authApi";
import {userDataType, FormAuthType, authApiInitState} from "types";

export const registration = createAsyncThunk(
  "auth/registration",
  async (userData: userDataType) => {
    const response = await getRegistration(userData);
    return response.data;
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (userData: FormAuthType) => {
    try {
      const response = await getLogin(userData);
      return response?.data;
    } catch(e: any) {
      const errorMessage = e?.error?.error;
      throw errorMessage;
    }
  }
);
export const refresh = createAsyncThunk("auth/refresh", async () => {
  try {
    const response = await check();
    return response.data;
  } catch(e: any) {
    const errorMessage = e?.error?.error;
    throw errorMessage;
  }
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
  loading: true,
  error: "",
  refreshError: "",
  isRefreshError: false,
  isError: false,
} as authApiInitState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuth = true;
      state.isRefreshError = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log('fulfilled: ', action)
      state.user = action.payload;
      state.loading = false;
      state.isAuth = true;
      state.isRefreshError = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      if(action.error && action.error.message) {
        state.error = action.error.message;
        state.isError = true;
      }
    })
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuth = true;
      state.isRefreshError = false;
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
      if(action.error && action.error.message) {
        state.refreshError = action.error.message;
        state.isRefreshError = true;
      }
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
