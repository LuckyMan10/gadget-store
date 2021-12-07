import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, createResponse } from "./http/index";
import {
  fetchFavList,
  fetchType,
  favListState,
  fetchForAuth,
  fetchForAuthWithData
} from "types";

export const getUserFavList = createAsyncThunk(
  "user/getFavList",
  async ({
    api_key,
    access_key,
    baseURL,
    method,
    url,
    withCredentials,
  }: fetchType<fetchFavList>) => {
    const headers = {
      api_key,
      authorization: `Bearer ${access_key}`,
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost });
    return response.data;
  }
);

export const updateUserFavList = createAsyncThunk(
  "user/putFavList",
  async ({
    api_key,
    access_key,
    baseURL,
    method,
    url,
    withCredentials,
    data,
  }: fetchType<fetchForAuth>) => {
    const headers = {
      api_key,
      authorization: `Bearer ${access_key}`,
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost, data });
    return response.data;
  }
);

export const deleteUserFavList = createAsyncThunk(
  "user/delFavList",
  async ({
    api_key,
    access_key,
    baseURL,
    method,
    url,
    withCredentials,
  }: fetchType<fetchFavList>) => {
    const headers = {
      api_key,
      authorization: `Bearer ${access_key}`,
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost });
    return response.data;
  }
);

const initialState = {
  userFavList: {
    userId: "",
    products: [],
  },
  loading: false,
  isWasFetched: false,
} as favListState;

const favListSlice = createSlice({
  name: "favList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserFavList.fulfilled, (state, action) => {
      if (action.payload) {
        state.userFavList.userId = action.payload[0].userId;
        state.userFavList.products = action.payload[0].products;
        state.loading = true;
        state.isWasFetched = true;
      }
    });
    builder.addCase(updateUserFavList.fulfilled, (state, action) => {
      if (action.payload) {
        state.userFavList.userId = action.payload.userId;
        state.userFavList.products = action.payload.products;
        state.loading = true;
        state.isWasFetched = true;
      }
    });
    builder.addCase(deleteUserFavList.fulfilled, (state, action) => {
      if (action.payload) {
        state.userFavList.userId = action.payload.userId;
        state.userFavList.products = action.payload.products;
        state.loading = true;
        state.isWasFetched = true;
      }
    });
  },
});

export default favListSlice.reducer;
