import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, createResponse } from "./http/index";
import {getSumm} from "helpers/getSumm";
import {
  userCartInitState,
  fetchType,
  fetchForAuth,
  getSummArrType,
  fetchForAuthWithData
} from "types";


export const getUserCart = createAsyncThunk(
  "user/getCart",
  async ({
    api_key,
    access_key,
    baseURL,
    method,
    url,
    withCredentials,
  }: fetchType<fetchForAuth>) => {
    const headers = {
      api_key,
      authorization: `Bearer ${access_key}`,
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost });
    return response.data;
  }
);

export const updateUserCart = createAsyncThunk(
  "user/putCart",
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

export const deleteUserCart = createAsyncThunk(
  "user/delCart",
  async ({
    api_key,
    access_key,
    baseURL,
    method,
    url,
    withCredentials
  }: fetchType<fetchForAuth>) => {
    const headers = {
      api_key,
      authorization: `Bearer ${access_key}`,
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost });
    return response.data;
  }
)

const initialState = {
  userCart: {
    userId: "",
    products: [],
    productsSummPrice: 0,
  },
  isWasFetched: false,
  loading: false,
} as userCartInitState;

const cartSlice = createSlice({
  name: "authCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getUserCart.fulfilled, (state, action) => {
      if (action.payload[0]) {
        state.userCart.userId = action.payload[0].userId;
        state.userCart.products = action.payload[0].products;
        const summ = getSumm<getSummArrType>(state.userCart.products);
        state.userCart.productsSummPrice = summ;
        state.loading = true;
        state.isWasFetched = true;
      }
    });

    builder.addCase(updateUserCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.userCart.userId = action.payload.userId;
        state.userCart.products = action.payload.products;
        const summ = getSumm<getSummArrType>(state.userCart.products);
        state.userCart.productsSummPrice = summ;
        state.loading = true;
        state.isWasFetched = true;
      }
    });

    builder.addCase(deleteUserCart.fulfilled, (state, action) => {
      if(action.payload) {
        state.userCart.userId = action.payload.userId;
        state.userCart.products = action.payload.products;
        const summ = getSumm<getSummArrType>(state.userCart.products);
        state.userCart.productsSummPrice = summ;
        state.loading = true;
        state.isWasFetched = true;
      }
    })
  },
});

export default cartSlice.reducer;
