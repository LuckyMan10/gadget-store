import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, createResponse } from "./http/index";
import axios from "axios";

interface productI {
  company: string;
  name: string;
  price: number;
  images: Array<string>;
  description: any;
  category: string;
  id: string;
}

interface initialStateI {
  userCart: {
    userId: string;
    products: Array<{
      productId: string;
      quantity: number;
      product: productI;
    }>
  };
  loading: boolean;
  isWasFetched: boolean;
}

interface userCartI {
  api_key: string;
  access_key: string;
  baseURL: string;
  method: string;
  url: string;
  withCredentials: boolean;
  data?: {
    username?: string;
    email?: string;
    password?: string;
    productId?: string;
    type?: string;
  };
}

export const getUserCart = createAsyncThunk(
  "user/getCart",
  async ({
    api_key,
    access_key,
    baseURL,
    method,
    url,
    withCredentials,
  }: userCartI) => {
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
  }: userCartI) => {
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
  }: userCartI) => {
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
  },
  isWasFetched: false,
  loading: false,
} as initialStateI;

const cartSlice = createSlice({
  name: "authCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getUserCart.fulfilled, (state, action) => {
      if (action.payload[0]) {
        state.userCart.userId = action.payload[0].userId;
        state.userCart.products = action.payload[0].products;
        state.loading = true;
        state.isWasFetched = true;
      }
    });

    builder.addCase(updateUserCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.userCart.userId = action.payload.userId;
        state.userCart.products = action.payload.products;
        state.loading = true;
        state.isWasFetched = true;
      }
    });

    builder.addCase(deleteUserCart.fulfilled, (state, action) => {
      if(action.payload) {
        state.userCart.userId = action.payload.userId;
        state.userCart.products = action.payload.products;
        state.loading = true;
        state.isWasFetched = true;
      }
    })
  },
});

export default cartSlice.reducer;
